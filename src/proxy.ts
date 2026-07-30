import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isSupportedLocale, locales } from "@/i18n/config"
import {
  getLinkDomainSlug,
  parseLinkDomainPath,
  parseLinkDomainSlug,
} from "@/lib/link-domain-route"

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url
  const localeFromQuery = url.searchParams.get("lang")
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value
  const locale = isSupportedLocale(localeFromQuery)
    ? localeFromQuery
    : localeFromCookie && isSupportedLocale(localeFromCookie)
      ? localeFromCookie
      : defaultLocale
  const legacyLocale = locales.find(
    (item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`)
  )

  if (
    legacyLocale &&
    pathname === `/${legacyLocale}/opengraph-image`
  ) {
    return NextResponse.next()
  }

  if (legacyLocale) {
    const legacyDomain =
      parseLinkDomainSlug(url.searchParams.get("tab")) ?? "general"
    url.pathname = `/${getLinkDomainSlug(legacyDomain)}`
    url.searchParams.delete("tab")
    url.searchParams.set("lang", legacyLocale)
    return NextResponse.redirect(url)
  }

  if (pathname === "/") {
    url.pathname = `/${getLinkDomainSlug("general")}`
    url.searchParams.set("lang", locale)
    return NextResponse.redirect(url)
  }

  const domain = parseLinkDomainPath(pathname)

  if (domain && pathname === `/${getLinkDomainSlug(domain)}`) {
    if (localeFromQuery !== locale) {
      url.searchParams.set("lang", locale)
      return NextResponse.redirect(url)
    }

    url.pathname = `/${locale}`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-link-domain", getLinkDomainSlug(domain))
    return NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    })
  }

  if (localeFromQuery !== locale) {
    url.searchParams.set("lang", locale)
    return NextResponse.redirect(url)
  }

  url.pathname = `/${locale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
