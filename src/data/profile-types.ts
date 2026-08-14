import type { Locale } from "@/i18n/config"
import type { DomainKey } from "@/i18n/types"

export const linkDomains = [
  "general",
  "afterDark",
  "work",
] as const satisfies readonly DomainKey[]

export const legacyIconNames = [
  "BriefcaseBusiness", "CalendarDays", "FileText", "Globe", "Link", "Mail",
  "PenLine", "SiFacebook", "SiInstagram", "SiRetroarch", "SiThreads", "SiX",
  "SiGithub", "SiLinkedin", "SiMastodon", "SiMedium", "SiPatreon",
  "SiPaypal", "SiPixiv", "SiQq", "SiTelegram", "SiTiktok", "SiWechat",
  "SiWeibo", "SiWhatsapp", "SiYoutube", "SiLine", "SiDiscord",
] as const

export const iconNames = legacyIconNames

export type IconName = string
export type LinkDomain = DomainKey
export type LocalizedText = Partial<Record<Locale, string>>

export type ProfileContent = {
  handle: string
  title: string
  badge: string
  description?: string
  metadataTitle: string
  metadataDescription: string
}

export type ProfileLink = {
  title: LocalizedText
  description?: LocalizedText
  href: string
  icon: IconName
  domain: LinkDomain[]
  category?: string
  enabled?: boolean
  external?: boolean
  priority?: number
}

export type RawProfileContent = Partial<ProfileContent>
export type RawProfileData = {
  avatar: string
  email: string
  siteUrl: string
  profile: Record<Locale, RawProfileContent>
  links: readonly ProfileLink[]
}

export type ProfileData = {
  avatar: string
  email: string
  siteUrl: string
  profile: Record<Locale, ProfileContent>
  links: readonly ProfileLink[]
}

export type ResolvedProfileLink = {
  title: string
  description?: string
  href: string
  icon: IconName
  domain: LinkDomain[]
  category: string
  enabled: boolean
  external: boolean
  priority: number
}
