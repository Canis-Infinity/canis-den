"use client"

import { useEffect, useState } from "react"
import { Cookie } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Dictionary } from "@/i18n/types"
import {
  cookieNames,
  deleteCookie,
  getCookieConsent,
  writeCookie,
  type CookieConsent,
} from "@/lib/cookies"

export const openCookieSettingsEvent = "canis:open-cookie-settings"

export function CookieNotice({ copy }: { copy: Dictionary["cookies"] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(!getCookieConsent()), 0)
    const showSettings = () => setOpen(true)
    window.addEventListener(openCookieSettingsEvent, showSettings)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(openCookieSettingsEvent, showSettings)
    }
  }, [])

  function saveConsent(consent: CookieConsent) {
    writeCookie(cookieNames.consent, consent)
    if (consent === "necessary") {
      deleteCookie(cookieNames.locale)
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <Card
      role="region"
      aria-label={copy.title}
      className="fixed right-4 bottom-4 left-4 z-40 mx-auto max-w-lg gap-3 py-4 shadow-lg sm:left-auto sm:mx-0"
    >
      <CardHeader className="flex-row items-center gap-3 px-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
          <Cookie className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            {copy.title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {copy.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-4 text-xs leading-5 text-muted-foreground">
        {copy.details}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 px-4">
        <Button variant="outline" onClick={() => saveConsent("necessary")}>
          {copy.necessaryOnly}
        </Button>
        <Button onClick={() => saveConsent("preferences")}>
          {copy.acceptPreferences}
        </Button>
      </CardFooter>
    </Card>
  )
}
