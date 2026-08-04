"use client"

import NextTopLoader from "nextjs-toploader"

import { CookieNotice } from "@/components/cookie-notice"
import { ExternalLinkGuard } from "@/components/external-link-guard"
import { PageLoadingState } from "@/components/page-loading-state"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { VisitTracker } from "@/components/visit-tracker"
import type { Dictionary } from "@/i18n/types"

export function Providers({
  children,
  externalLinkCopy,
  cookieCopy,
}: {
  children: React.ReactNode
  externalLinkCopy: Dictionary["externalLink"]
  cookieCopy: Dictionary["cookies"]
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader
        color="var(--primary)"
        crawlSpeed={160}
        height={3}
        shadow={false}
        showSpinner={false}
      />
      <PageLoadingState />
      <VisitTracker />
      <ExternalLinkGuard copy={externalLinkCopy}>
        <TooltipProvider delay={150}>{children}</TooltipProvider>
      </ExternalLinkGuard>
      <CookieNotice copy={cookieCopy} />
      <Toaster />
    </ThemeProvider>
  )
}
