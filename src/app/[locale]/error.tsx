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
      code={copy.errorCode}
      title={copy.errorTitle}
      description={copy.errorDescription}
      actions={[
        { label: copy.retry, onClick: reset },
        { label: copy.home, href: `/${locale}` },
      ]}
    >
      {error.digest ? (
        <code className="mt-2 max-w-full break-all rounded-md border bg-muted px-2 py-1 font-mono text-xs text-foreground">
          {copy.errorReference}: {error.digest}
        </code>
      ) : null}
    </StatusPage>
  )
}
