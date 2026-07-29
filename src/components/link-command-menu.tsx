"use client"

import { useEffect, useState } from "react"
import { Languages, Mail, Search, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"
import { useTopLoader } from "nextjs-toploader"
import { useRouter } from "next/navigation"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
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
import { type Locale, type ResolvedProfileLink, locales } from "@/data/profile"
import { linkIconMap } from "@/lib/link-icons"
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

const languageLabels: Record<Locale, string> = {
  "zh-TW": "繁中",
  en: "English",
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
}

function openHref(href: string) {
  if (href.startsWith("mailto:")) {
    window.location.href = href
    return
  }

  window.open(href, "_blank", "noreferrer")
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
  const router = useRouter()
  const topLoader = useTopLoader()
  const { setTheme, theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return
    }

    writeLocaleCookie(nextLocale)
    topLoader.start()
    router.push(`/${nextLocale}`)
  }

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
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) {
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
                const Icon = linkIconMap[link.icon]

                return (
                  <CommandItem
                    key={`${link.title}-${link.href}`}
                    value={`${link.title} ${link.description ?? ""}`}
                    onSelect={() => {
                      setOpen(false)
                      openHref(link.href)
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
                  value={`${languageLabel} ${languageLabels[value]}`}
                  onSelect={() => {
                    setOpen(false)
                    changeLocale(value)
                  }}
                >
                  <Languages className="size-4" />
                  <span>{languageLabels[value]}</span>
                  {value === locale ? <CommandShortcut>✓</CommandShortcut> : null}
                </CommandItem>
              ))}
              <CommandItem
                value={contactLabel}
                onSelect={() => {
                  setOpen(false)
                  openHref(contactHref)
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
