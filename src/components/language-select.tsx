"use client"

import { TW, US } from "country-flag-icons/react/3x2"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  isSupportedLocale,
  type Locale,
  localeNames,
  locales,
} from "@/i18n/config"
import { useLocaleNavigation } from "@/hooks/use-locale-navigation"

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
  "zh-TW": { label: localeNames["zh-TW"], Flag: TW },
  en: { label: localeNames.en, Flag: US },
}

export function LanguageSelect({
  locale,
  label,
  compact = false,
}: {
  locale: Locale
  label: string
  compact?: boolean
}) {
  const safeLocale = isSupportedLocale(locale) ? locale : locales[0]
  const changeLocale = useLocaleNavigation(safeLocale)
  const selectedLanguage = languages[safeLocale]
  const SelectedFlag = selectedLanguage.Flag

  return (
    <Select
      value={safeLocale}
      onValueChange={(value) => {
        if (!isSupportedLocale(value)) {
          return
        }

        if (value === safeLocale) {
          return
        }

        changeLocale(value)
      }}
    >
      <ResponsiveTooltip label={label}>
        <SelectTrigger
          aria-label={label}
          className={
            compact
              ? "w-full min-w-0 justify-center border-transparent bg-transparent shadow-none hover:bg-muted dark:bg-transparent dark:hover:bg-muted"
              : "min-w-28"
          }
          size={compact ? "sm" : "default"}
        >
          <span className="flex items-center gap-2">
            <SelectedFlag className="h-3.5 w-5 rounded-[2px]" />
            <span>{selectedLanguage.label}</span>
          </span>
        </SelectTrigger>
      </ResponsiveTooltip>
      <SelectContent align="end">
        {locales.map((value) => {
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
