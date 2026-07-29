"use client"

import { TW, US } from "country-flag-icons/react/3x2"
import { useTopLoader } from "nextjs-toploader"
import { useRouter } from "next/navigation"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { type Locale } from "@/data/profile"

type FlagIconProps = {
  className?: string
}

const languages: Record<
  Locale,
  {
    label: string
    Flag: (props: FlagIconProps) => React.ReactNode
  }
> = {
  "zh-TW": { label: "繁中", Flag: TW },
  en: { label: "English", Flag: US },
}

const localeOptions = ["zh-TW", "en"] as const

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && value in languages
}

export function LanguageSelect({
  locale,
  label,
}: {
  locale: Locale
  label: string
}) {
  const router = useRouter()
  const topLoader = useTopLoader()
  const selectedLanguage = languages[locale]
  const SelectedFlag = selectedLanguage.Flag

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        if (!isLocale(value)) {
          return
        }

        if (value === locale) {
          return
        }

        document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; samesite=lax`
        topLoader.start()
        router.push(`/${value}`)
      }}
    >
      <ResponsiveTooltip label={label}>
        <SelectTrigger aria-label={label} className="min-w-28" size="default">
          <span className="flex items-center gap-2">
            <SelectedFlag className="h-3.5 w-5 rounded-[2px]" />
            <span>{selectedLanguage.label}</span>
          </span>
        </SelectTrigger>
      </ResponsiveTooltip>
      <SelectContent align="end">
        {localeOptions.map((value) => {
          const language = languages[value]
          const Flag = language.Flag

          return (
            <SelectItem key={value} value={value} label={language.label}>
              <Flag className="h-3.5 w-5 rounded-[2px]" />
              <span>{language.label}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
