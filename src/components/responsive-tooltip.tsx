"use client"

import { useEffect, useState, type ReactElement, type ReactNode } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ResponsiveTooltipProps = {
  children: ReactElement
  label: ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export function ResponsiveTooltip({
  children,
  label,
  side = "top",
}: ResponsiveTooltipProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(media.matches)

    update()
    media.addEventListener("change", update)

    return () => {
      media.removeEventListener("change", update)
    }
  }, [])

  if (!enabled) {
    return children
  }

  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  )
}
