"use client"

import { useEffect, useRef, useState } from "react"

import type { LinkDomain } from "@/data/profile"
import type { Locale } from "@/i18n/config"
import {
  isAgeVerified,
  rememberAgeVerification,
  rememberCurrentLinkDomain,
  replaceLinkDomain,
} from "@/lib/link-domain-route"

export function useLinkDomainNavigation(
  initialDomain: LinkDomain,
  locale: Locale
) {
  const [activeDomain, setActiveDomain] = useState<LinkDomain>(() =>
    initialDomain === "afterDark" ? "general" : initialDomain
  )
  const [agePromptOpen, setAgePromptOpen] = useState(false)
  const [ageDeniedOpen, setAgeDeniedOpen] = useState(false)
  const ageVerified = useRef(false)

  useEffect(() => {
    ageVerified.current = isAgeVerified()

    if (initialDomain === "afterDark") {
      if (ageVerified.current) {
        setActiveDomain("afterDark")
        rememberCurrentLinkDomain("afterDark")
      } else {
        setAgePromptOpen(true)
      }
    } else {
      rememberCurrentLinkDomain(initialDomain)
    }
  }, [initialDomain])

  function requestDomain(domain: LinkDomain) {
    if (domain === "afterDark" && !ageVerified.current) {
      setAgePromptOpen(true)
      return
    }

    setActiveDomain(domain)
    rememberCurrentLinkDomain(domain)
    replaceLinkDomain(domain, locale)
  }

  function confirmAge() {
    ageVerified.current = true
    rememberAgeVerification()
    setAgePromptOpen(false)
    setAgeDeniedOpen(false)
    setActiveDomain("afterDark")
    rememberCurrentLinkDomain("afterDark")
    replaceLinkDomain("afterDark", locale)
  }

  function denyAge() {
    setAgePromptOpen(false)
    setAgeDeniedOpen(true)
  }

  function chooseSafeDomain(domain: Exclude<LinkDomain, "afterDark">) {
    setAgeDeniedOpen(false)
    setActiveDomain(domain)
    rememberCurrentLinkDomain(domain)
    replaceLinkDomain(domain, locale)
  }

  return {
    activeDomain,
    agePromptOpen,
    ageDeniedOpen,
    requestDomain,
    confirmAge,
    denyAge,
    chooseSafeDomain,
  }
}
