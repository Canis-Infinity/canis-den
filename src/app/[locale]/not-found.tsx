"use client"

import { useParams } from "next/navigation"

import { StatusPage } from "@/components/status-page"
import { getStatusCopy, resolveStatusLocale } from "@/lib/status-copy"

export default function NotFound() {
  const params = useParams<{ locale?: string }>()
  const locale = resolveStatusLocale(params.locale)
  const copy = getStatusCopy(locale)

  return (
    <StatusPage
      code="404"
      title={copy.notFoundTitle}
      description={copy.notFoundDescription}
      actions={[{ label: copy.home, href: `/${locale}` }]}
    />
  )
}
