"use client"

import { useEffect, useRef, useState } from "react"

import type { LinkDomain } from "@/data/profile"
import type { Locale } from "@/i18n/config"
import {
  getLinkDomainHref,
  parseLinkDomainPath,
  replaceLinkDomain,
  visitLinkDomain,
} from "@/lib/link-domain-route"

export function useLinkDomainNavigation(locale: Locale) {
  const [activeDomain, setActiveDomain] = useState<LinkDomain>("general")
  const [agePromptOpen, setAgePromptOpen] = useState(false)
  const [ageDeniedOpen, setAgeDeniedOpen] = useState(false)
  const ageVerified = useRef(false)

  useEffect(() => {
    function syncFromUrl() {
      const domain =
        parseLinkDomainPath(window.location.pathname) ?? "general"

      if (domain === "afterDark" && !ageVerified.current) {
        setAgePromptOpen(true)
        return
      }

      setAgePromptOpen(false)
      setAgeDeniedOpen(false)
      setActiveDomain(domain)
    }

    if (!parseLinkDomainPath(window.location.pathname)) {
      window.history.replaceState(
        null,
        "",
        getLinkDomainHref("general", locale)
      )
    }

    const timer = window.setTimeout(syncFromUrl, 0)
    window.addEventListener("popstate", syncFromUrl)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("popstate", syncFromUrl)
    }
  }, [locale])

  function requestDomain(domain: LinkDomain) {
    if (domain === "afterDark" && !ageVerified.current) {
      setAgePromptOpen(true)
      return
    }

    setActiveDomain(domain)
    visitLinkDomain(domain, locale)
  }

  function confirmAge() {
    ageVerified.current = true
    setAgePromptOpen(false)
    setActiveDomain("afterDark")
    visitLinkDomain("afterDark", locale)
  }

  function denyAge() {
    setAgePromptOpen(false)
    setAgeDeniedOpen(true)
  }

  function chooseSafeDomain(domain: Exclude<LinkDomain, "afterDark">) {
    setAgeDeniedOpen(false)
    setActiveDomain(domain)
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
