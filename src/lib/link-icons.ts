import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Globe,
  Link as LinkIcon,
  Mail,
  PenLine,
} from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLine,
  SiMastodon,
  SiMedium,
  SiPatreon,
  SiPaypal,
  SiPixiv,
  SiQq,
  SiRetroarch,
  SiSinaweibo,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiWechat,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si"
import type { IconType } from "react-icons"

import type { IconName, ResolvedProfileLink } from "@/data/profile"

export const linkIconMap: Record<IconName, IconType> = {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Globe,
  Link: LinkIcon,
  Mail,
  PenLine,
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLine,
  SiLinkedin: FaLinkedin,
  SiMastodon,
  SiMedium,
  SiPatreon,
  SiPaypal,
  SiPixiv,
  SiQq,
  SiRetroarch,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiWechat,
  SiWeibo: SiSinaweibo,
  SiWhatsapp,
  SiX,
  SiYoutube,
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

export function getLinkPlatform(
  link: Pick<ResolvedProfileLink, "icon" | "title">
) {
  return platformByIcon[link.icon] ?? link.title
}
