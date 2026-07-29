"use client"

import { useEffect } from "react"

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
    <html lang={profileData.defaultLocale}>
      <body>
        <StatusPage
          code="5XX"
          title={copy.errorTitle}
          description={copy.errorDescription}
          actions={[
            { label: copy.retry, onClick: reset },
            { label: copy.home, href: `/${profileData.defaultLocale}` },
          ]}
        />
      </body>
    </html>
  )
}
