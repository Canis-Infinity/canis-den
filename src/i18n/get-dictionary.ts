import { en } from "@/i18n/dictionaries/en"
import { zhTW } from "@/i18n/dictionaries/zh-TW"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

const dictionaries: Record<Locale, Dictionary> = {
  "zh-TW": zhTW,
  en,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
