import type { MetadataRoute } from "next"

import { getProfileRepository } from "@/data/profile"
import { defaultLocale } from "@/i18n/config"
import { getLinkDomainHref } from "@/lib/link-domain-route"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const profileRepository = await getProfileRepository()
  const content = profileRepository.getContent(defaultLocale)

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
        src: profileRepository.profileData.avatar,
        sizes: "1600x1600",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  }
}
