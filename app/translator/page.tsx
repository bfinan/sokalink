"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ENGLISH,
  getOppositeLanguage,
  isSupportedLanguage,
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
} from "@/lib/translator";

type TranslateApiResponse = {
  translatedText?: string;
  error?: string;
};

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<SupportedLanguage>(
    ENGLISH
  );
  const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>(
    getOppositeLanguage(ENGLISH)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(
    () => sourceText.trim().length > 0 && !isSubmitting,
    [isSubmitting, sourceText]
  );

  const handleToggleLanguages = () => {
    setSourceLanguage((current) => getOppositeLanguage(current));
    setTargetLanguage((current) => getOppositeLanguage(current));
    setTranslatedText("");
    setErrorMessage("");
  };

  const handleSourceLanguageChange = (value: string) => {
    if (!isSupportedLanguage(value)) {
      return;
    }

    setSourceLanguage(value);
    setTargetLanguage(getOppositeLanguage(value));
    setTranslatedText("");
    setErrorMessage("");
  };

  const handleTargetLanguageChange = (value: string) => {
    if (!isSupportedLanguage(value)) {
      return;
    }

    setTargetLanguage(value);
    setSourceLanguage(getOppositeLanguage(value));
    setTranslatedText("");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = sourceText.trim();
    if (!trimmedText) {
      setErrorMessage("Enter text to translate before pressing Submit.");
      setTranslatedText("");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceText: trimmedText,
          sourceLanguage,
          targetLanguage,
        }),
      });

      let payload: TranslateApiResponse = {};
      try {
        payload = (await response.json()) as TranslateApiResponse;
      } catch {
        payload = {};
      }

      if (!response.ok) {
        const readableError =
          payload.error ??
          "Translation request failed. Please verify your Gemini API environment variables and try again.";
        console.error(`[Translator UI] ${readableError}`);
        setErrorMessage(readableError);
        setTranslatedText("");
        return;
      }

      if (!payload.translatedText) {
        const readableError =
          "Translation completed, but Gemini returned no translated text.";
        console.error(`[Translator UI] ${readableError}`);
        setErrorMessage(readableError);
        setTranslatedText("");
        return;
      }

      setTranslatedText(payload.translatedText);
    } catch (error) {
      const readableError =
        "Unable to reach the translation service right now. Check your internet connection and try again.";
      console.error(
        `[Translator UI] ${readableError} ${
          error instanceof Error ? error.message : "Unknown client-side error."
        }`
      );
      setErrorMessage(readableError);
      setTranslatedText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-6 py-12">
      <main className="w-full max-w-5xl p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Translator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Supported right now: English ⇄ Chuukese (Micronesian).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Input language
              </span>
              <select
                value={sourceLanguage}
                onChange={(event) => handleSourceLanguageChange(event.target.value)}
                className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option key={`source-${language}`} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleToggleLanguages}
              className="h-12 px-4 rounded-full bg-[#088F8F] text-white hover:bg-[#0056b3] transition-colors"
              aria-label="Swap source and target languages"
              title="Swap languages"
            >
              🔁
            </button>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Output language
              </span>
              <select
                value={targetLanguage}
                onChange={(event) => handleTargetLanguageChange(event.target.value)}
                className="w-full p-3 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option key={`target-${language}`} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Text to translate
              </span>
              <textarea
                value={sourceText}
                onChange={(event) => {
                  setSourceText(event.target.value);
                  setTranslatedText("");
                }}
                placeholder="Type English or Chuukese text here..."
                className="min-h-48 w-full p-3 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Translation
              </span>
              <textarea
                value={translatedText}
                readOnly
                placeholder="Your translated output will appear here..."
                className="min-h-48 w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-[#088F8F] text-white px-5 py-3 font-semibold hover:bg-[#0056b3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Translating..." : "Submit"}
          </button>

          {errorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          )}
        </form>
      </main>
    </div>
  );
}
