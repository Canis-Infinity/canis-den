import type { MetadataRoute } from "next"

import { profileData } from "@/data/profile"

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? profileData.siteUrl)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  }
}
