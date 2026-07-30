import type { MetadataRoute } from "next"

import { getProfileContent, profileData } from "@/data/profile"
import { defaultLocale } from "@/i18n/config"
import { getLinkDomainHref } from "@/lib/link-domain-route"

export default function manifest(): MetadataRoute.Manifest {
  const content = getProfileContent(defaultLocale)

  return {
    name: content.metadataTitle,
    short_name: content.badge,
    description: content.metadataDescription,
    start_url: getLinkDomainHref("general", defaultLocale),
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: profileData.avatar,
        sizes: "1600x1600",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  }
}
