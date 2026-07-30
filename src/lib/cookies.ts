export const cookieNames = {
  consent: "CANIS_COOKIE_CONSENT",
  locale: "NEXT_LOCALE",
} as const

export type CookieConsent = "preferences" | "necessary"

const cookieMaxAge = 60 * 60 * 24 * 180

export function readCookie(name: string) {
  if (typeof document === "undefined") return undefined

  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=")
}

export function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${cookieMaxAge}; samesite=lax`
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
}

export function getCookieConsent(): CookieConsent | undefined {
  const value = readCookie(cookieNames.consent)
  return value === "preferences" || value === "necessary" ? value : undefined
}

export function persistLocalePreference(locale: string) {
  if (getCookieConsent() === "preferences") {
    writeCookie(cookieNames.locale, locale)
  }
}
