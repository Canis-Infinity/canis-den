export const locales = ["zh-TW", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "zh-TW"

export const localeNames: Record<Locale, string> = {
  "zh-TW": "繁中",
  en: "English",
}

export const localeFormats: Record<
  Locale,
  {
    dateTime: string
    openGraph: string
  }
> = {
  "zh-TW": {
    dateTime: "zh-TW",
    openGraph: "zh_TW",
  },
  en: {
    dateTime: "en-US",
    openGraph: "en_US",
  },
}

export function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale)
}

export function resolveLocale(value: unknown): Locale {
  return isSupportedLocale(value) ? value : defaultLocale
}
