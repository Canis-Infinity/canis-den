import { StatusPage } from "@/components/status-page"
import { getStatusCopy } from "@/lib/status-copy"
import { profileData } from "@/data/profile"

export default function NotFound() {
  const copy = getStatusCopy(profileData.defaultLocale)

  return (
    <StatusPage
      code="404"
      title={copy.notFoundTitle}
      description={copy.notFoundDescription}
      actions={[{ label: copy.home, href: `/${profileData.defaultLocale}` }]}
    />
  )
}
