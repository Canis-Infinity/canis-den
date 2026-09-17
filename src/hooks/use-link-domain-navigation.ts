"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import type { LinkDomain } from "@/data/profile"
import type { Locale } from "@/i18n/config"
import {
  isAgeVerified,
  getLinkDomainHref,
  rememberAgeVerification,
  rememberCurrentLinkDomain,
} from "@/lib/link-domain-route"

export function useLinkDomainNavigation(
  initialDomain: LinkDomain,
  locale: Locale
) {
  const router = useRouter()
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
    router.replace(getLinkDomainHref(domain, locale), { scroll: false })
  }

  function confirmAge() {
    ageVerified.current = true
    rememberAgeVerification()
    setAgePromptOpen(false)
    setAgeDeniedOpen(false)
    setActiveDomain("afterDark")
    rememberCurrentLinkDomain("afterDark")
    router.replace(getLinkDomainHref("afterDark", locale), { scroll: false })
  }

  function denyAge() {
    setAgePromptOpen(false)
    setAgeDeniedOpen(true)
  }

  function chooseSafeDomain(domain: Exclude<LinkDomain, "afterDark">) {
    setAgeDeniedOpen(false)
    setActiveDomain(domain)
    rememberCurrentLinkDomain(domain)
    router.replace(getLinkDomainHref(domain, locale), { scroll: false })
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
