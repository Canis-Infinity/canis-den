import type { MetadataRoute } from "next"

import { locales, profileData } from "@/data/profile"

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? profileData.siteUrl)

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === profileData.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((item) => [item, new URL(`/${item}`, siteUrl).toString()])
      ),
    },
  }))
}
