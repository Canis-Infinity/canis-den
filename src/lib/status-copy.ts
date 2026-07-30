import { resolveLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export const resolveStatusLocale = resolveLocale

export function getStatusCopy(locale: Locale) {
  return getDictionary(locale).status
}
