"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { StatusPage } from "@/components/status-page"
import { isSupportedLocale } from "@/i18n/config"
import { getLinkDomainHref } from "@/lib/link-domain-route"
import { getStatusCopy, resolveStatusLocale } from "@/lib/status-copy"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const searchParams = useSearchParams()
  const requestedLocale = searchParams.get("lang")
  const locale = resolveStatusLocale(
    isSupportedLocale(requestedLocale) ? requestedLocale : undefined
  )
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
        { label: copy.home, href: getLinkDomainHref("general", locale) },
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
