"use client"

import { openCookieSettingsEvent } from "@/components/cookie-notice"
import { LanguageSelect } from "@/components/language-select"
import { ModeToggle } from "@/components/mode-toggle"
import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/config"

export function SiteFooter({
  locale,
  languageLabel,
  themeLabel,
  cookieSettings,
  rightsReserved,
}: {
  locale: Locale
  languageLabel: string
  themeLabel: string
  cookieSettings: string
  rightsReserved: string
}) {
  return (
    <footer className="flex flex-col items-center gap-3 pb-2 pt-1 text-xs leading-5 text-muted-foreground">
      <nav
        aria-label={languageLabel}
        className="grid w-full grid-cols-3 gap-2 rounded-xl border bg-card/50 p-2"
      >
        <LanguageSelect locale={locale} label={languageLabel} compact />
        <ModeToggle label={themeLabel} compact showLabel />
        <ResponsiveTooltip label={cookieSettings}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() =>
              window.dispatchEvent(new Event(openCookieSettingsEvent))
            }
          >
            {cookieSettings}
          </Button>
        </ResponsiveTooltip>
      </nav>
      <p className="text-center text-muted-foreground">
        © 2026{" "}
        <a
          href="https://iistw.com/"
          target="_blank"
          rel="noreferrer"
          data-skip-external-warning
          className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Canis
        </a>
        <span aria-hidden="true"> · </span>
        {rightsReserved}
      </p>
    </footer>
  )
}
