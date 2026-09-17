import type { LinkDomain } from "@/data/profile"
import type { Locale } from "@/i18n/config"

const domainSlugs: Record<LinkDomain, string> = {
  general: "general",
  afterDark: "after-dark",
  work: "work",
}

const domainsBySlug = Object.fromEntries(
  Object.entries(domainSlugs).map(([domain, slug]) => [slug, domain])
) as Record<string, LinkDomain>

const sessionKeys = {
  currentDomain: "CANIS_LINK_DOMAIN",
  ageVerified: "CANIS_AGE_VERIFIED",
} as const

export function getLinkDomainSlug(domain: LinkDomain) {
  return domainSlugs[domain]
}

export function parseLinkDomainSlug(value: string | null) {
  return value ? domainsBySlug[value] : undefined
}

export function parseLinkDomainPath(pathname: string) {
  return parseLinkDomainSlug(pathname.split("/").filter(Boolean)[0] ?? null)
}

export function getLinkDomainHref(domain: LinkDomain, locale: Locale) {
  return `/${getLinkDomainSlug(domain)}?lang=${encodeURIComponent(locale)}`
}

export function getCurrentLinkDomain() {
  if (typeof window === "undefined") return "general"

  const rememberedDomain = window.sessionStorage.getItem(
    sessionKeys.currentDomain
  )

  return (
    parseLinkDomainPath(window.location.pathname) ??
    parseLinkDomainSlug(rememberedDomain) ??
    "general"
  )
}

export function replaceLinkDomain(domain: LinkDomain, locale: Locale) {
  History.prototype.replaceState.call(
    window.history,
    window.history.state,
    "",
    getLinkDomainHref(domain, locale)
  )
}

export function rememberCurrentLinkDomain(domain: LinkDomain) {
  window.sessionStorage.setItem(
    sessionKeys.currentDomain,
    getLinkDomainSlug(domain)
  )
}

export function isAgeVerified() {
  return window.sessionStorage.getItem(sessionKeys.ageVerified) === "true"
}

export function rememberAgeVerification() {
  window.sessionStorage.setItem(sessionKeys.ageVerified, "true")
}
