"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { Button } from "@/components/ui/button"
import { getNextTheme } from "@/lib/theme-mode"

export function ModeToggle({
  label,
  compact = false,
  showLabel = false,
}: {
  label: string
  compact?: boolean
  showLabel?: boolean
}) {
  const { setTheme, theme } = useTheme()

  return (
    <ResponsiveTooltip label={label}>
      <Button
        aria-label={label}
        size={compact ? "sm" : "icon"}
        variant={compact ? "ghost" : "outline"}
        className={compact ? "relative w-full" : "relative"}
        onClick={() => {
          setTheme(getNextTheme(theme))
        }}
      >
        <span className="relative size-4">
          <Sun className="absolute inset-0 size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute inset-0 size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </span>
        {showLabel ? <span>{label}</span> : null}
      </Button>
    </ResponsiveTooltip>
  )
}
