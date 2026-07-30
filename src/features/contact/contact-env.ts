import { z } from "zod"

import { profileData } from "@/data/profile"

const contactEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_FROM_EMAIL: z
    .string()
    .min(1)
    .default("Canis Den Contact <onboarding@resend.dev>"),
  CONTACT_TO_EMAIL: z.email().default(profileData.email),
})

export function getContactEnvironment() {
  return contactEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  })
}
