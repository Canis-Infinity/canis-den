import { geistMono, notoSansTC } from "@/app/fonts"
import { StatusPage } from "@/components/status-page"
import { getStatusCopy } from "@/lib/status-copy"
import { profileData } from "@/data/profile"

import "./globals.css"

export default function NotFound() {
  const copy = getStatusCopy(profileData.defaultLocale)

  return (
    <div className={`${notoSansTC.variable} ${geistMono.variable} font-sans`}>
      <StatusPage
        code="404"
        title={copy.notFoundTitle}
        description={copy.notFoundDescription}
        actions={[{ label: copy.home, href: `/${profileData.defaultLocale}` }]}
      />
    </div>
  )
}
