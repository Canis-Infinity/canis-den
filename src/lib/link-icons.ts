import * as LucideIcons from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import * as SimpleIcons from "react-icons/si"
import type { IconType } from "react-icons"

import type { IconName, ResolvedProfileLink } from "@/data/profile"

type IconRegistry = Record<string, unknown>

const lucideIconRegistry = LucideIcons as IconRegistry
const simpleIconRegistry = SimpleIcons as IconRegistry

const fallbackIcon = LucideIcons.Link

const iconAliases: Record<string, IconType> = {
  SiLinkedin: FaLinkedin,
  SiWeibo: SimpleIcons.SiSinaweibo,
}

const platformByIcon: Partial<Record<IconName, string>> = {
  SiDiscord: "Discord",
  SiFacebook: "Facebook",
  SiGithub: "GitHub",
  SiInstagram: "Instagram",
  SiLine: "LINE",
  SiLinkedin: "LinkedIn",
  SiMastodon: "Mastodon",
  SiMedium: "Medium",
  SiPatreon: "Patreon",
  SiPaypal: "PayPal",
  SiPixiv: "Pixiv",
  SiQq: "QQ",
  SiRetroarch: "Retro",
  SiTelegram: "Telegram",
  SiThreads: "Threads",
  SiTiktok: "TikTok",
  SiWechat: "WeChat",
  SiWeibo: "Weibo",
  SiWhatsapp: "WhatsApp",
  SiX: "X",
  SiYoutube: "YouTube",
}

function toPascalCaseIconName(value: string) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")
}

function getRegistryIcon(registry: IconRegistry, name: string) {
  const icon = registry[name]
  return typeof icon === "function" ? (icon as IconType) : undefined
}

export function getLinkIcon(iconName: string | null | undefined): IconType {
  const name = iconName?.trim()
  if (!name) return fallbackIcon

  const pascalName = toPascalCaseIconName(name)

  return (
    iconAliases[name] ??
    getRegistryIcon(lucideIconRegistry, name) ??
    getRegistryIcon(lucideIconRegistry, pascalName) ??
    getRegistryIcon(simpleIconRegistry, name) ??
    getRegistryIcon(simpleIconRegistry, pascalName) ??
    fallbackIcon
  )
}

export function getLinkPlatform(
  link: Pick<ResolvedProfileLink, "icon" | "title">
) {
  return platformByIcon[link.icon] ?? link.title
}
