import { type Locale, isSupportedLocale, profileData } from "@/data/profile"

type StatusCopy = {
  notFoundTitle: string
  notFoundDescription: string
  errorTitle: string
  errorDescription: string
  errorCode: string
  errorReference: string
  home: string
  retry: string
}

const statusCopy: Record<Locale, StatusCopy> = {
  "zh-TW": {
    notFoundTitle: "找不到頁面",
    notFoundDescription: "這個入口可能已移除、改名，或暫時不存在。",
    errorTitle: "頁面暫時無法載入",
    errorDescription:
      "伺服器處理頁面時發生內部錯誤。你可以重新載入，若問題持續發生，請提供下方錯誤識別碼。",
    errorCode: "500",
    errorReference: "錯誤識別碼",
    home: "回到首頁",
    retry: "重新載入",
  },
  en: {
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This entry may have been removed, renamed, or is temporarily unavailable.",
    errorTitle: "Something went wrong",
    errorDescription:
      "The server encountered an internal error while processing this page. Try again, or provide the error reference below if the problem continues.",
    errorCode: "500",
    errorReference: "Error reference",
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
