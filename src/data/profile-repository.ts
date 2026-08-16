import type {
  LocalizedText,
  ProfileContent,
  ProfileData,
  ProfileLink,
  RawProfileData,
  ResolvedProfileLink,
} from "@/data/profile-types"
import { defaultLocale, locales, type Locale } from "@/i18n/config"

function resolveContent(data: RawProfileData, locale: Locale): ProfileContent {
  const fallback = data.profile[defaultLocale]
  const current = data.profile[locale]
  const required = (key: keyof ProfileContent) => {
    const value = current[key] ?? fallback[key]
    if (typeof value !== "string") {
      throw new Error(`Missing required default profile field: ${key}`)
    }
    return value
  }

  return {
    handle: required("handle"),
    title: required("title"),
    badge: required("badge"),
    description: current.description ?? fallback.description,
    metadataTitle: required("metadataTitle"),
    metadataDescription: required("metadataDescription"),
  }
}

function localize(text: LocalizedText | undefined, locale: Locale) {
  return text?.[locale] ?? text?.[defaultLocale]
}

function resolveLink(link: ProfileLink, locale: Locale): ResolvedProfileLink {
  const title = localize(link.title, locale)
  if (!title) throw new Error("Every link title must define the default locale.")
  const href = link.href.trim()

  return {
    title,
    description: localize(link.description, locale),
    href,
    icon: link.icon,
    domain: link.domain,
    category: link.category ?? "links",
    enabled: link.enabled ?? true,
    external: link.external ?? !href.startsWith("mailto:"),
    priority: link.priority ?? 100,
  }
}

export function createProfileRepository(data: RawProfileData) {
  const profileData: ProfileData = {
    ...data,
    profile: Object.fromEntries(
      locales.map((locale) => [locale, resolveContent(data, locale)])
    ) as Record<Locale, ProfileContent>,
  }

  return {
    profileData,
    getContent: (locale: Locale) => profileData.profile[locale],
    getLinks: (locale: Locale) =>
      profileData.links
        .map((link) => resolveLink(link, locale))
        .filter((link) => link.enabled)
        .sort((left, right) => left.priority - right.priority),
  }
}
