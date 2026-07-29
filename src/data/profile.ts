import rawProfile from "@/data/profile.json"

export const locales = ["zh-TW", "en"] as const
export const iconNames = [
  "BriefcaseBusiness",
  "CalendarDays",
  "FileText",
  "Globe",
  "Link",
  "Mail",
  "PenLine",
  "SiFacebook",
  "SiInstagram",
  "SiRetroarch",
  "SiThreads",
  "SiX",
  "SiGithub",
  "SiLinkedin",
  "SiMastodon",
  "SiMedium",
  "SiPatreon",
  "SiPaypal",
  "SiPixiv",
  "SiQq",
  "SiTelegram",
  "SiTiktok",
  "SiWechat",
  "SiWeibo",
  "SiWhatsapp",
  "SiYoutube",
] as const

export type Locale = (typeof locales)[number]
export type IconName = (typeof iconNames)[number]

type LocalizedText = Partial<Record<Locale, string>>

type ProfileContent = {
  name: string
  handle: string
  title: string
  badge: string
  description?: string
  contact: string
  language: string
  themeToggle: string
  backToTop: string
  linksLabel: string
  commandOpen: string
  commandTitle: string
  commandDescription: string
  commandPlaceholder: string
  commandEmpty: string
  commandActions: string
  metadataTitle: string
  metadataDescription: string
}

const profileContentKeys = [
  "name",
  "handle",
  "title",
  "badge",
  "contact",
  "language",
  "themeToggle",
  "backToTop",
  "linksLabel",
  "commandOpen",
  "commandTitle",
  "commandDescription",
  "commandPlaceholder",
  "commandEmpty",
  "commandActions",
  "metadataTitle",
  "metadataDescription",
] as const

const allowedProfileContentKeys = [
  ...profileContentKeys,
  "description",
] as const

export type ProfileLink = {
  title: LocalizedText
  description?: LocalizedText
  href: string
  icon: IconName
  category?: string
  enabled?: boolean
  external?: boolean
  priority?: number
}

type RawProfileContent = Partial<ProfileContent>

type RawProfileLink = {
  title: LocalizedText
  description?: LocalizedText
  href: string
  icon: IconName
  category?: string
  enabled?: boolean
  external?: boolean
  priority?: number
}

type RawProfileData = {
  defaultLocale: Locale
  locales: readonly Locale[]
  avatar: string
  email: string
  siteUrl: string
  profile: Record<Locale, RawProfileContent>
  links: readonly RawProfileLink[]
}

export type ProfileData = {
  defaultLocale: Locale
  locales: readonly Locale[]
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
  category: string
  enabled: boolean
  external: boolean
  priority: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function hasString(record: Record<string, unknown>, key: string) {
  return typeof record[key] === "string"
}

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale)
}

function isIconName(value: unknown): value is IconName {
  return typeof value === "string" && iconNames.includes(value as IconName)
}

function isLocalizedText(value: unknown): value is LocalizedText {
  if (!isRecord(value)) {
    return false
  }

  return Object.entries(value).every(
    ([locale, text]) => isLocale(locale) && typeof text === "string"
  )
}

function isProfileContent(value: unknown): value is RawProfileContent {
  if (!isRecord(value)) {
    return false
  }

  return Object.entries(value).every(
    ([key, text]) =>
      allowedProfileContentKeys.includes(key as keyof ProfileContent) &&
      typeof text === "string"
  )
}

function isCompleteProfileContent(value: unknown): value is ProfileContent {
  if (!isRecord(value)) {
    return false
  }

  return profileContentKeys.every((key) => hasString(value, key))
}

function isProfileLink(value: unknown): value is RawProfileLink {
  if (!isRecord(value)) {
    return false
  }

  return (
    isLocalizedText(value.title) &&
    (value.description === undefined || isLocalizedText(value.description)) &&
    hasString(value, "href") &&
    isIconName(value.icon) &&
    (value.category === undefined || typeof value.category === "string") &&
    (value.enabled === undefined || typeof value.enabled === "boolean") &&
    (value.external === undefined || typeof value.external === "boolean") &&
    (value.priority === undefined || typeof value.priority === "number")
  )
}

function isProfileData(value: unknown): value is RawProfileData {
  if (!isRecord(value)) {
    return false
  }

  if (
    !isLocale(value.defaultLocale) ||
    !Array.isArray(value.locales) ||
    !value.locales.every(isLocale) ||
    !hasString(value, "avatar") ||
    !hasString(value, "email") ||
    !hasString(value, "siteUrl") ||
    !isRecord(value.profile) ||
    !Array.isArray(value.links)
  ) {
    return false
  }

  const profile = value.profile
  const links = value.links

  if (!isRecord(profile) || !Array.isArray(links)) {
    return false
  }

  return (
    isCompleteProfileContent(profile[value.defaultLocale]) &&
    locales.every((locale) => isProfileContent(profile[locale])) &&
    links.every(isProfileLink)
  )
}

function resolveProfileContent(
  data: RawProfileData,
  locale: Locale
): ProfileContent {
  const fallback = data.profile[data.defaultLocale]
  const current = data.profile[locale]
  const getField = (key: keyof ProfileContent) => {
    const value = current[key] ?? fallback[key]

    if (typeof value !== "string") {
      throw new Error(`Missing required default profile field: ${key}`)
    }

    return value
  }
  const getOptionalField = (key: keyof ProfileContent) => {
    return current[key] ?? fallback[key]
  }

  return {
    name: getField("name"),
    handle: getField("handle"),
    title: getField("title"),
    badge: getField("badge"),
    description: getOptionalField("description"),
    contact: getField("contact"),
    language: getField("language"),
    themeToggle: getField("themeToggle"),
    backToTop: getField("backToTop"),
    linksLabel: getField("linksLabel"),
    commandOpen: getField("commandOpen"),
    commandTitle: getField("commandTitle"),
    commandDescription: getField("commandDescription"),
    commandPlaceholder: getField("commandPlaceholder"),
    commandEmpty: getField("commandEmpty"),
    commandActions: getField("commandActions"),
    metadataTitle: getField("metadataTitle"),
    metadataDescription: getField("metadataDescription"),
  }
}

function resolveLocalizedText(
  text: LocalizedText | undefined,
  locale: Locale,
  defaultLocale: Locale
) {
  return text?.[locale] ?? text?.[defaultLocale]
}

function resolveProfileLink(
  link: RawProfileLink,
  locale: Locale,
  defaultLocale: Locale
): ResolvedProfileLink {
  const title = resolveLocalizedText(link.title, locale, defaultLocale)

  if (!title) {
    throw new Error("Every link title must define the default locale.")
  }

  return {
    title,
    description: resolveLocalizedText(link.description, locale, defaultLocale),
    href: link.href,
    icon: link.icon,
    category: link.category ?? "links",
    enabled: link.enabled ?? true,
    external: link.external ?? !link.href.startsWith("mailto:"),
    priority: link.priority ?? 100,
  }
}

function resolveProfileData(data: RawProfileData): ProfileData {
  return {
    ...data,
    profile: Object.fromEntries(
      locales.map((locale) => [locale, resolveProfileContent(data, locale)])
    ) as Record<Locale, ProfileContent>,
  }
}

function loadProfileData(value: unknown): ProfileData {
  if (!isProfileData(value)) {
    throw new Error("Invalid src/data/profile.json shape.")
  }

  return resolveProfileData(value)
}

export const profileData = loadProfileData(rawProfile)

export function isSupportedLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getProfileContent(locale: Locale) {
  return profileData.profile[locale]
}

export function getProfileLinks(locale: Locale) {
  return profileData.links
    .map((link) => resolveProfileLink(link, locale, profileData.defaultLocale))
    .filter((link) => link.enabled)
    .sort((left, right) => left.priority - right.priority)
}
