import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Globe,
  Link as LinkIcon,
  Mail,
  PenLine,
} from "lucide-react"
import {
  SiFacebook,
  SiInstagram,
  SiRetroarch,
  SiThreads,
  SiX,
} from "react-icons/si"
import type { IconType } from "react-icons"

import type { IconName } from "@/data/profile"

export const linkIconMap: Record<IconName, IconType> = {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Globe,
  Link: LinkIcon,
  Mail,
  PenLine,
  SiFacebook,
  SiInstagram,
  SiRetroarch,
  SiThreads,
  SiX,
}
