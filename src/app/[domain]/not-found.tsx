"use client"

import { useSearchParams } from "next/navigation"

import { StatusPage } from "@/components/status-page"
import { isSupportedLocale } from "@/i18n/config"
import { getLinkDomainHref } from "@/lib/link-domain-route"
import { getStatusCopy, resolveStatusLocale } from "@/lib/status-copy"

export default function NotFound() {
  const searchParams = useSearchParams()
  const requestedLocale = searchParams.get("lang")
  const locale = resolveStatusLocale(
    isSupportedLocale(requestedLocale) ? requestedLocale : undefined
  )
  const copy = getStatusCopy(locale)

  return (
    <StatusPage
      code="404"
      title={copy.notFoundTitle}
      description={copy.notFoundDescription}
      actions={[
        { label: copy.home, href: getLinkDomainHref("general", locale) },
      ]}
    />
  )
}
