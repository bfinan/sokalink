# Sokalink - One-click link sharing

A website and extension that allow you to share links to a feed in one click.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Translator page (Gemini API)

The app now includes a translator page at `/translator` with support for:

- English -> Chuukese (Micronesian)
- Chuukese (Micronesian) -> English

To enable Gemini-backed translation, add these environment variables in your deployment dashboard (for example, Vercel project settings and/or Supabase environment settings):

- `GEMINI_API_KEY` (required): your Google Gemini API key
- `GEMINI_MODEL` (optional): model ID; defaults to `gemini-2.5-flash`

If translation fails, the API route logs human-readable errors in the server logs to help troubleshoot missing keys, invalid model IDs, or rejected requests.

