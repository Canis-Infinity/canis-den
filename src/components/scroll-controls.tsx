"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { Button } from "@/components/ui/button"

export function ScrollControls({ label }: { label: string }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
        const nextProgress =
          scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0

        setProgress(nextProgress)
        setVisible(scrollTop > 80)
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-1 bg-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
      {visible ? (
        <ResponsiveTooltip label={label}>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="fixed right-4 bottom-4 z-40 bg-background/90 shadow-sm backdrop-blur"
            aria-label={label}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp />
          </Button>
        </ResponsiveTooltip>
      ) : null}
    </>
  )
}
