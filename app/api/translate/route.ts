import { NextResponse } from "next/server";
import {
  isSupportedLanguage,
  isSupportedPair,
  SUPPORTED_LANGUAGES,
} from "@/lib/translator";

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

type TranslateRequestBody = {
  sourceText?: unknown;
  sourceLanguage?: unknown;
  targetLanguage?: unknown;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function buildMissingApiKeyMessage(): string {
  return "Gemini API key is missing. Add GEMINI_API_KEY in your Vercel/Supabase environment settings.";
}

function parseGeminiErrorMessage(rawResponseBody: string): string {
  if (!rawResponseBody) {
    return "No details returned by Gemini.";
  }

  try {
    const parsed = JSON.parse(rawResponseBody) as {
      error?: {
        code?: number;
        status?: string;
        message?: string;
      };
    };
    const details = parsed?.error;
    if (!details) {
      return rawResponseBody;
    }

    const pieces = [
      typeof details.code === "number" ? `code ${details.code}` : null,
      typeof details.status === "string" ? details.status : null,
      typeof details.message === "string" ? details.message : null,
    ].filter(Boolean);

    return pieces.length > 0 ? pieces.join(" - ") : rawResponseBody;
  } catch {
    return rawResponseBody;
  }
}

export async function POST(request: Request) {
  let parsedBody: TranslateRequestBody;

  try {
    parsedBody = (await request.json()) as TranslateRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Please submit valid JSON payload." },
      { status: 400 }
    );
  }

  const sourceText =
    typeof parsedBody.sourceText === "string" ? parsedBody.sourceText.trim() : "";
  const sourceLanguage = parsedBody.sourceLanguage;
  const targetLanguage = parsedBody.targetLanguage;

  if (!sourceText) {
    return NextResponse.json(
      { error: "Please provide text to translate before submitting." },
      { status: 400 }
    );
  }

  if (!isSupportedLanguage(sourceLanguage) || !isSupportedLanguage(targetLanguage)) {
    return NextResponse.json(
      {
        error: `Unsupported language selection. Supported languages are: ${SUPPORTED_LANGUAGES.join(
          ", "
        )}.`,
      },
      { status: 400 }
    );
  }

  if (!isSupportedPair(sourceLanguage, targetLanguage)) {
    return NextResponse.json(
      {
        error:
          "Unsupported translation direction. Only English ↔ Chuukese translations are available right now.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const humanMessage = buildMissingApiKeyMessage();
    console.error(`[Translator API] ${humanMessage}`);
    return NextResponse.json({ error: humanMessage }, { status: 500 });
  }

  const prompt = `The following user-submitted text is in ${sourceLanguage}. Please translate it to ${targetLanguage}. Return only the translated text.\n\n${sourceText}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    DEFAULT_GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error(
      `[Translator API] Network error while contacting Gemini. ${
        error instanceof Error ? error.message : "Unknown fetch error."
      }`
    );
    return NextResponse.json(
      {
        error:
          "Could not reach Gemini translation service. Check network connectivity and API configuration, then try again.",
      },
      { status: 502 }
    );
  }

  if (!geminiResponse.ok) {
    const rawBody = await geminiResponse.text();
    const readableDetails = parseGeminiErrorMessage(rawBody);
    console.error(
      `[Translator API] Gemini rejected translation request (${geminiResponse.status} ${geminiResponse.statusText}). ${readableDetails}`
    );

    return NextResponse.json(
      {
        error:
          "Gemini translation request failed. Confirm GEMINI_API_KEY and GEMINI_MODEL are valid in your deployment settings.",
      },
      { status: 502 }
    );
  }

  const data = (await geminiResponse.json()) as GeminiResponse;
  const translatedText = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!translatedText) {
    console.error(
      "[Translator API] Gemini returned success but no translated text in candidates."
    );
    return NextResponse.json(
      {
        error:
          "Gemini responded without translation text. Try again, or change GEMINI_MODEL to a supported model.",
      },
      { status: 502 }
    );
  }

  console.info(
    `[Translator API] Translation succeeded (${sourceLanguage} -> ${targetLanguage}).`
  );
  return NextResponse.json({ translatedText });
}
