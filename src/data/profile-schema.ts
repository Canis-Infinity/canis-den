import { z } from "zod"

import {
  iconNames,
  linkDomains,
  type RawProfileData,
} from "@/data/profile-types"
import { defaultLocale, locales } from "@/i18n/config"

const localizedTextSchema = z
  .object({
    "zh-TW": z.string().optional(),
    en: z.string().optional(),
  })
  .refine((value) => Boolean(value[defaultLocale]), {
    message: `The default locale ${defaultLocale} is required.`,
  })

const profileContentSchema = z.object({
  name: z.string().optional(),
  handle: z.string().optional(),
  title: z.string().optional(),
  badge: z.string().optional(),
  description: z.string().optional(),
  metadataTitle: z.string().optional(),
  metadataDescription: z.string().optional(),
})

const profileLinkSchema = z.object({
  title: localizedTextSchema,
  description: localizedTextSchema.optional(),
  href: z.url(),
  icon: z.enum(iconNames),
  domain: z.array(z.enum(linkDomains)).min(1),
  category: z.string().optional(),
  enabled: z.boolean().optional(),
  external: z.boolean().optional(),
  priority: z.number().optional(),
})

const profileDataSchema = z
  .object({
    avatar: z.string().min(1),
    email: z.email(),
    siteUrl: z.url(),
    profile: z.object({
      "zh-TW": profileContentSchema,
      en: profileContentSchema,
    }),
    links: z.array(profileLinkSchema),
  })
  .superRefine((value, context) => {
    const fallback = value.profile[defaultLocale]
    const required = [
      "handle",
      "title",
      "badge",
      "metadataTitle",
      "metadataDescription",
    ] as const

    for (const key of required) {
      if (!fallback[key]) {
        context.addIssue({
          code: "custom",
          path: ["profile", defaultLocale, key],
          message: `Missing required default profile field: ${key}`,
        })
      }
    }

    for (const locale of locales) {
      if (!value.profile[locale]) {
        context.addIssue({
          code: "custom",
          path: ["profile", locale],
          message: `Missing locale profile: ${locale}`,
        })
      }
    }
  })

export function parseProfileData(value: unknown): RawProfileData {
  return profileDataSchema.parse(value) as RawProfileData
}
