import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export type ContactFormValues = {
  name: string
  email: string
  category: string
  subject: string
  message: string
  replyPreference: string
  acknowledged: boolean
  website: string
}

export type ContactRequest = ContactFormValues & {
  locale: Locale
}

export type ContactCopy = Dictionary["contact"]
export type ContactErrorKey = keyof ContactCopy["errors"]
export type ContactFormErrors = Partial<Record<ContactErrorKey, string>>

export const initialContactForm: ContactFormValues = {
  name: "",
  email: "",
  category: "",
  subject: "",
  message: "",
  replyPreference: "email",
  acknowledged: false,
  website: "",
}
