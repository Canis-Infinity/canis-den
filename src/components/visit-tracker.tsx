"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const trackedPaths = new Set<string>()

export function VisitTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const path = `${pathname}?${searchParams.toString()}`

    if (trackedPaths.has(path)) return
    trackedPaths.add(path)

    fetch("/api/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ site: "canis-den", path }),
      cache: "no-store",
      keepalive: true,
    }).catch(() => {
      trackedPaths.delete(path)
    })
  }, [pathname, searchParams])

  return null
}
