"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"

import { StatusPage } from "@/components/status-page"
import { getStatusCopy, resolveStatusLocale } from "@/lib/status-copy"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ locale?: string }>()
  const locale = resolveStatusLocale(params.locale)
  const copy = getStatusCopy(locale)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage
      code="5XX"
      title={copy.errorTitle}
      description={copy.errorDescription}
      actions={[
        { label: copy.retry, onClick: reset },
        { label: copy.home, href: `/${locale}` },
      ]}
    />
  )
}
