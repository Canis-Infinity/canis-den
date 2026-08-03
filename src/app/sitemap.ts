import type { MetadataRoute } from "next"

import { getProfileRepository, linkDomains } from "@/data/profile"
import { defaultLocale, locales } from "@/i18n/config"
import { getLinkDomainHref } from "@/lib/link-domain-route"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profileRepository = await getProfileRepository()
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? profileRepository.profileData.siteUrl
  )
  return linkDomains.flatMap((domain) =>
    locales.map((locale) => ({
      url: new URL(getLinkDomainHref(domain, locale), siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority:
        domain === "general" && locale === defaultLocale
          ? 1
          : domain === "general"
            ? 0.9
            : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [
            item,
            new URL(getLinkDomainHref(domain, item), siteUrl).toString(),
          ])
        ),
      },
    }))
  )
}
