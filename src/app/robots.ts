import type { MetadataRoute } from "next"

import { getProfileRepository } from "@/data/profile"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const profileRepository = await getProfileRepository()
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? profileRepository.profileData.siteUrl
  )
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  }
}
