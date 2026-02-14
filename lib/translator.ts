export const ENGLISH = "English";
export const CHUUKESE = "Chuukese (Micronesian)";

export const SUPPORTED_LANGUAGES = [ENGLISH, CHUUKESE] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(value: unknown): value is SupportedLanguage {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)
  );
}

export function getOppositeLanguage(
  language: SupportedLanguage
): SupportedLanguage {
  return language === ENGLISH ? CHUUKESE : ENGLISH;
}

export function isSupportedPair(
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): boolean {
  return getOppositeLanguage(sourceLanguage) === targetLanguage;
}
