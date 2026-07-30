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
  return typeof window === "undefined"
    ? "general"
    : (parseLinkDomainPath(window.location.pathname) ?? "general")
}

export function visitLinkDomain(domain: LinkDomain, locale: Locale) {
  window.history.pushState(null, "", getLinkDomainHref(domain, locale))
}

export function replaceLinkDomain(domain: LinkDomain, locale: Locale) {
  window.history.replaceState(null, "", getLinkDomainHref(domain, locale))
}
