import { type Locale, isSupportedLocale, profileData } from "@/data/profile"

type StatusCopy = {
  notFoundTitle: string
  notFoundDescription: string
  errorTitle: string
  errorDescription: string
  home: string
  retry: string
}

const statusCopy: Record<Locale, StatusCopy> = {
  "zh-TW": {
    notFoundTitle: "找不到頁面",
    notFoundDescription: "這個入口可能已移除、改名，或暫時不存在。",
    errorTitle: "頁面暫時無法載入",
    errorDescription: "發生了未預期的錯誤，請稍後再試一次。",
    home: "回到首頁",
    retry: "重新載入",
  },
  en: {
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This entry may have been removed, renamed, or is temporarily unavailable.",
    errorTitle: "Something went wrong",
    errorDescription:
      "An unexpected error occurred. Please try loading the page again.",
    home: "Back home",
    retry: "Try again",
  },
}

export function resolveStatusLocale(value: unknown): Locale {
  if (typeof value === "string" && isSupportedLocale(value)) {
    return value
  }

  return profileData.defaultLocale
}

export function getStatusCopy(locale: Locale) {
  return statusCopy[locale]
}
