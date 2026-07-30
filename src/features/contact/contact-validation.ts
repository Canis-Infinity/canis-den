import { z } from "zod"

import type {
  ContactCopy,
  ContactFormErrors,
  ContactFormValues,
} from "@/features/contact/contact.types"

export const contactLimits = {
  name: 80,
  email: 254,
  category: 40,
  subject: 100,
  message: 3000,
  replyPreference: 20,
  website: 200,
} as const

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(contactLimits.name),
  email: z.string().trim().max(contactLimits.email).regex(emailPattern),
  category: z.string().trim().min(1).max(contactLimits.category),
  subject: z.string().trim().min(4).max(contactLimits.subject),
  message: z.string().trim().min(5).max(contactLimits.message),
  replyPreference: z.enum(["email", "no-reply"]),
  acknowledged: z.literal(true),
  website: z.string().trim().max(contactLimits.website),
})

export function validateContactForm(
  form: ContactFormValues,
  copy: ContactCopy
) {
  const result = contactFormSchema.safeParse(form)
  const errors: ContactFormErrors = {}

  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path[0]
      if (typeof key === "string" && key in copy.errors) {
        errors[key as keyof ContactFormErrors] =
          copy.errors[key as keyof ContactCopy["errors"]]
      }
    }
  }

  return errors
}
