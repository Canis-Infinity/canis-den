import { NextResponse, type NextRequest } from "next/server"

import { isSupportedLocale, locales, profileData } from "@/data/profile"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameHasLocale) {
    return
  }

  const locale = request.cookies.get("NEXT_LOCALE")?.value
  const safeLocale = locale && isSupportedLocale(locale) ? locale : profileData.defaultLocale

  request.nextUrl.pathname = `/${safeLocale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
