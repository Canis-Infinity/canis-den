import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-6">
      <Card className="w-full max-w-md py-0">
        <CardContent className="flex flex-col items-center px-6 py-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">{code}</p>
          <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          {children}
          <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
            {actions.map((action) =>
              action.href ? (
                <Button
                  key={`${action.label}-${action.href}`}
                  render={<a href={action.href} />}
                  nativeButton={false}
                  variant="outline"
                  className="w-full"
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
