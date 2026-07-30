"use client"

import { useEffect } from "react"

import { geistMono, notoSansTC } from "@/app/fonts"
import { StatusPage } from "@/components/status-page"
import { profileData } from "@/data/profile"
import { getStatusCopy } from "@/lib/status-copy"

import "./globals.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const copy = getStatusCopy(profileData.defaultLocale)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html
      lang={profileData.defaultLocale}
      className={`${notoSansTC.variable} ${geistMono.variable}`}
    >
      <body>
        <StatusPage
          code={copy.errorCode}
          title={copy.errorTitle}
          description={copy.errorDescription}
          actions={[
            { label: copy.retry, onClick: reset },
            { label: copy.home, href: `/${profileData.defaultLocale}` },
          ]}
        >
          {error.digest ? (
            <code className="mt-2 max-w-full break-all rounded-md border bg-muted px-2 py-1 font-mono text-xs text-foreground">
              {copy.errorReference}: {error.digest}
            </code>
          ) : null}
        </StatusPage>
      </body>
    </html>
  )
}
