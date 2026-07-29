import type { MetadataRoute } from "next"

import { getProfileContent, profileData } from "@/data/profile"

export default function manifest(): MetadataRoute.Manifest {
  const content = getProfileContent(profileData.defaultLocale)

  return {
    name: content.metadataTitle,
    short_name: content.badge,
    description: content.metadataDescription,
    start_url: `/${profileData.defaultLocale}`,
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
