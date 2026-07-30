import { geistMono, notoSansTC } from "@/app/fonts"
import { StatusPage } from "@/components/status-page"
import { defaultLocale } from "@/i18n/config"
import { getStatusCopy } from "@/lib/status-copy"

import "./globals.css"

export default function NotFound() {
  const copy = getStatusCopy(defaultLocale)

  return (
    <div className={`${notoSansTC.variable} ${geistMono.variable} font-sans`}>
      <StatusPage
        code="404"
        title={copy.notFoundTitle}
        description={copy.notFoundDescription}
        actions={[{ label: copy.home, href: `/${defaultLocale}` }]}
      />
    </div>
  )
}
