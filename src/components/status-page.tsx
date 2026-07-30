import type { ReactNode } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type StatusPageAction = {
  label: string
  href?: string
  onClick?: () => void
}

type StatusPageProps = {
  code: string
  title: string
  description: string
  actions: readonly StatusPageAction[]
  children?: ReactNode
}

export function StatusPage({
  code,
  title,
  description,
  actions,
  children,
}: StatusPageProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-svh w-full min-w-0 items-center justify-center overflow-x-hidden bg-muted/30 px-4 py-6">
        <Empty className="w-full min-w-0 max-w-lg border bg-card px-6 py-12 shadow-sm sm:px-10 sm:py-14">
          <EmptyHeader className="w-full min-w-0 gap-2.5">
            <EmptyMedia>
              <span
                className="font-mono text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl"
                aria-label={`HTTP ${code}`}
              >
                {code}
              </span>
            </EmptyMedia>
            <EmptyTitle className="text-lg sm:text-xl">{title}</EmptyTitle>
            <EmptyDescription className="w-full min-w-0 max-w-sm text-pretty">
              {description}
            </EmptyDescription>
            {children}
          </EmptyHeader>
          <EmptyContent className="w-auto max-w-full flex-row flex-wrap justify-center">
            {actions.map((action, index) =>
              action.href ? (
                <Button
                  key={`${action.label}-${action.href}`}
                  render={<a href={action.href} />}
                  nativeButton={false}
                  variant={index === 0 ? "default" : "outline"}
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={action.label}
                  type="button"
                  variant={index === 0 ? "default" : "outline"}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              )
            )}
          </EmptyContent>
        </Empty>
      </main>
    </ThemeProvider>
  )
}
