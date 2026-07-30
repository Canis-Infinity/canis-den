import { z } from "zod"

import { contactFormSchema } from "@/features/contact/contact-validation"
import type { ContactRequest } from "@/features/contact/contact.types"
import { locales } from "@/i18n/config"

const contactRequestSchema = contactFormSchema.extend({
  locale: z.enum(locales),
})

export function parseContactRequest(
  value: unknown,
  allowedCategories: ReadonlySet<string>
): ContactRequest | undefined {
  const result = contactRequestSchema.safeParse(value)

  if (!result.success || !allowedCategories.has(result.data.category)) {
    return
  }

  return result.data
}
