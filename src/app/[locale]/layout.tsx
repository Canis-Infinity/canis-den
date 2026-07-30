import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import { geistMono, notoSansTC } from "@/app/fonts"
import { Providers } from "@/components/providers"
import {
  getProfileContent,
  isSupportedLocale,
  locales,
  profileData,
} from "@/data/profile"

import "../globals.css"

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? profileData.siteUrl)

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

  const content = getProfileContent(locale)
  const ogImage = `/${locale}/opengraph-image`

  return {
    metadataBase: siteUrl,
    applicationName: "Canis Den",
    title: {
      default: content.metadataTitle,
      template: `%s | ${content.title}`,
    },
    description: content.metadataDescription,
    keywords: ["Canis Den", content.name, "LinkTree", "portfolio", "links"],
    authors: [{ name: content.name }],
    creator: content.name,
    publisher: content.title,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.jpg",
    },
    openGraph: {
      type: "website",
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
      url: `/${locale}`,
      siteName: content.title,
      title: content.metadataTitle,
      description: content.metadataDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${content.metadataTitle} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadataTitle,
      description: content.metadataDescription,
      images: [ogImage],
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

  return (
    <html
      lang={locale}
      className={`${notoSansTC.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
