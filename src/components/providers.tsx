"use client"

import NextTopLoader from "nextjs-toploader"

import { PageLoadingState } from "@/components/page-loading-state"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
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
      <TooltipProvider delay={150}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
