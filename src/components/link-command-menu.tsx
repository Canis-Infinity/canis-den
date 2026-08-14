"use client"

import { useEffect, useState } from "react"
import { Languages, Mail, Search, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { useExternalLinkGuard } from "@/components/external-link-guard"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import type { ResolvedProfileLink } from "@/data/profile"
import { localeNames, locales, type Locale } from "@/i18n/config"
import { useLocaleNavigation } from "@/hooks/use-locale-navigation"
import { getLinkIcon } from "@/lib/link-icons"
import { getNextTheme } from "@/lib/theme-mode"

type LinkCommandMenuProps = {
  links: readonly ResolvedProfileLink[]
  locale: Locale
  contactHref: string
  contactLabel: string
  languageLabel: string
  themeLabel: string
  linksLabel: string
  openLabel: string
  title: string
  description: string
  placeholder: string
  emptyLabel: string
  actionsLabel: string
}

function openHref(href: string, requestExternalLink: (href: string) => void) {
  if (href.startsWith("mailto:")) {
    window.location.href = href
    return
  }

  requestExternalLink(href)
}

export function LinkCommandMenu({
  links,
  locale,
  contactHref,
  contactLabel,
  languageLabel,
  themeLabel,
  linksLabel,
  openLabel,
  title,
  description,
  placeholder,
  emptyLabel,
  actionsLabel,
}: LinkCommandMenuProps) {
  const { requestExternalLink } = useExternalLinkGuard()
  const changeLocale = useLocaleNavigation(locale)
  const { setTheme, theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 640px) and (hover: hover) and (pointer: fine)"
    )
    const update = () => {
      setEnabled(media.matches)
      setOpen((current) => (media.matches ? current : false))
    }

    update()
    media.addEventListener("change", update)

    return () => {
      media.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        (!event.metaKey && !event.ctrlKey)
      ) {
        return
      }

      event.preventDefault()
      setOpen((current) => !current)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <>
      <ResponsiveTooltip
        label={
          <>
            <span>{openLabel}</span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </>
        }
      >
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          aria-label={openLabel}
          onClick={() => setOpen(true)}
        >
          <Search className="size-4" />
          <span className="sr-only sm:not-sr-only">{openLabel}</span>
          <KbdGroup className="hidden sm:inline-flex">
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
      </ResponsiveTooltip>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
      >
        <form
          role="search"
          autoComplete="off"
          data-1p-ignore="true"
          data-bwignore="true"
          data-form-type="other"
          data-lpignore="true"
          onSubmit={(event) => event.preventDefault()}
        >
          <Command>
            <CommandInput
              aria-label={placeholder}
              placeholder={placeholder}
              name="command-palette-search"
              inputMode="search"
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              data-1p-ignore="true"
              data-bwignore="true"
              data-form-type="other"
              data-lpignore="true"
            />
            <CommandList>
              <CommandEmpty>{emptyLabel}</CommandEmpty>
              <CommandGroup heading={linksLabel}>
                {links.map((link) => {
                  const Icon = getLinkIcon(link.icon)

                  return (
                    <CommandItem
                      key={`${link.title}-${link.href}`}
                      value={`${link.title} ${link.description ?? ""}`}
                      onSelect={() => {
                        setOpen(false)
                        openHref(link.href, requestExternalLink)
                      }}
                    >
                      <Icon className="size-4" />
                      <span>{link.title}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading={actionsLabel}>
                <CommandItem
                  value={themeLabel}
                  onSelect={() => {
                    setOpen(false)
                    setTheme(getNextTheme(theme))
                  }}
                >
                  <SunMoon className="size-4" />
                  <span>{themeLabel}</span>
                </CommandItem>
                {locales.map((value) => (
                  <CommandItem
                    key={value}
                    value={`${languageLabel} ${localeNames[value]}`}
                    onSelect={() => {
                      setOpen(false)
                      changeLocale(value)
                    }}
                  >
                    <Languages className="size-4" />
                    <span>{localeNames[value]}</span>
                    {value === locale ? (
                      <CommandShortcut>✓</CommandShortcut>
                    ) : null}
                  </CommandItem>
                ))}
                <CommandItem
                  value={contactLabel}
                  onSelect={() => {
                    setOpen(false)
                    openHref(contactHref, requestExternalLink)
                  }}
                >
                  <Mail className="size-4" />
                  <span>{contactLabel}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </form>
      </CommandDialog>
    </>
  )
}
