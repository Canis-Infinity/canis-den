"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { Button } from "@/components/ui/button"
import { getNextTheme } from "@/lib/theme-mode"

export function ModeToggle({ label }: { label: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <ResponsiveTooltip label={label}>
      <Button
        aria-label={label}
        size="icon"
        variant="outline"
        onClick={() => {
          setTheme(getNextTheme(theme))
        }}
      >
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </ResponsiveTooltip>
  )
}
