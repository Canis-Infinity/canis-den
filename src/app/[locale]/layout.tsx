import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import { geistMono, notoSansTC } from "@/app/fonts"
import { Providers } from "@/components/providers"
import { getProfileRepository } from "@/data/profile"
import { isSupportedLocale, localeFormats, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import {
  getLinkDomainHref,
  parseLinkDomainSlug,
} from "@/lib/link-domain-route"

import "../globals.css"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getOgImageVersion() {
  const image = await readFile(join(process.cwd(), "public", "og.jpg"))

  return createHash("sha256").update(image).digest("hex").slice(0, 12)
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }
  const profileRepository = await getProfileRepository()
  const content = profileRepository.getContent(locale)
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? profileRepository.profileData.siteUrl
  )
  const requestHeaders = await headers()
  const domain =
    parseLinkDomainSlug(requestHeaders.get("x-link-domain")) ?? "general"
  const ogImageVersion = await getOgImageVersion()
  const ogImage = `/og.jpg?v=${ogImageVersion}`

  return {
    metadataBase: siteUrl,
    applicationName: "Canis Den",
    title: content.badge,
    description: content.metadataDescription,
    keywords: [
      "Canis Den",
      content.handle,
      "九宵",
      "犬系",
      "可愛犬窩",
      "link in bio",
      "portfolio",
      "social links",
    ],
    authors: [{ name: content.handle }],
    creator: content.handle,
    publisher: content.title,
    alternates: {
      canonical: getLinkDomainHref(domain, locale),
      languages: Object.fromEntries(
        locales.map((item) => [item, getLinkDomainHref(domain, item)])
      ),
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.jpg",
    },
    openGraph: {
      type: "website",
      locale: localeFormats[locale].openGraph,
      url: getLinkDomainHref(domain, locale),
      siteName: content.title,
      title: content.metadataTitle,
      description: content.metadataDescription,
      images: [
        {
          url: ogImage,
          width: 1672,
          height: 941,
          alt: `${content.metadataTitle} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadataTitle,
      description: content.metadataDescription,
      images: [
        {
          url: ogImage,
          alt: `${content.metadataTitle} preview`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    category: "portfolio",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }
  const dictionary = getDictionary(locale)

  return (
    <html
      lang={locale}
      className={`${notoSansTC.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers
          externalLinkCopy={dictionary.externalLink}
          cookieCopy={dictionary.cookies}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
