"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useContactForm } from "@/features/contact/use-contact-form"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

export function ContactDialog({
  locale,
  triggerLabel,
  copy,
}: {
  locale: Locale
  triggerLabel: string
  copy: Dictionary["contact"]
}) {
  const [open, setOpen] = useState(false)
  const form = useContactForm({
    locale,
    copy,
    onSuccess: () => setOpen(false),
  })

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) form.reset()
    setOpen(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveTooltip label={triggerLabel}>
        <DialogTrigger render={<Button variant="outline" className="w-full" />}>
          <Mail />
          {triggerLabel}
        </DialogTrigger>
      </ResponsiveTooltip>

      <DialogContent className="max-h-[min(90svh,48rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-5 py-4 pr-12">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <ContactForm copy={copy} state={form} />
      </DialogContent>
    </Dialog>
  )
}
