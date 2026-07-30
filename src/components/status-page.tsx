import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
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
    <main className="flex min-h-svh w-full min-w-0 items-center justify-center overflow-x-hidden bg-background px-4 py-6">
      <Empty className="w-full min-w-0 max-w-lg bg-gradient-to-b from-muted/50 to-muted px-8 py-14 sm:py-16">
        <EmptyHeader className="w-full min-w-0 gap-3">
          <p
            className="max-w-full break-words font-mono text-6xl font-semibold tracking-tighter text-foreground sm:text-7xl"
            aria-label={`HTTP ${code}`}
          >
            {code}
          </p>
          <EmptyTitle className="text-xl sm:text-2xl">{title}</EmptyTitle>
          <EmptyDescription className="w-full min-w-0 max-w-sm leading-6">
            {description}
          </EmptyDescription>
          {children}
        </EmptyHeader>
        <EmptyContent className="w-auto max-w-full">
          <div className="flex w-auto max-w-full min-w-0 flex-col justify-center gap-2 sm:flex-row">
            {actions.map((action, index) =>
              action.href ? (
                <Button
                  key={`${action.label}-${action.href}`}
                  render={<a href={action.href} />}
                  nativeButton={false}
                  variant={index === 0 ? "default" : "outline"}
                  className="min-w-28"
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={action.label}
                  type="button"
                  variant={index === 0 ? "default" : "outline"}
                  className="min-w-28"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              )
            )}
          </div>
        </EmptyContent>
      </Empty>
    </main>
  )
}
