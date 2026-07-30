"use client"

import { useTopLoader } from "nextjs-toploader"
import { useRouter } from "next/navigation"

import { persistLocalePreference } from "@/lib/cookies"
import {
  getCurrentLinkDomain,
  getLinkDomainHref,
} from "@/lib/link-domain-route"
import type { Locale } from "@/i18n/config"

export function useLocaleNavigation(currentLocale: Locale) {
  const router = useRouter()
  const topLoader = useTopLoader()

  return (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return

    persistLocalePreference(nextLocale)
    topLoader.start()
    router.push(getLinkDomainHref(getCurrentLinkDomain(), nextLocale))
  }
}
