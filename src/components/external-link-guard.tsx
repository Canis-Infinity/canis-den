"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react"
import { ExternalLink } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Dictionary } from "@/i18n/types"

type ExternalLinkCopy = Dictionary["externalLink"]

type ExternalLinkContextValue = {
  requestExternalLink: (href: string) => void
}

const ExternalLinkContext = createContext<ExternalLinkContextValue | null>(null)

function isGuardedExternalLink(anchor: HTMLAnchorElement) {
  if (anchor.dataset.skipExternalWarning !== undefined) return false
  if (
    !anchor.href ||
    anchor.protocol === "mailto:" ||
    anchor.protocol === "tel:"
  )
    return false

  return anchor.origin !== window.location.origin
}

export function ExternalLinkGuard({
  children,
  copy,
}: {
  children: ReactNode
  copy: ExternalLinkCopy
}) {
  const [pendingHref, setPendingHref] = useState<string>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const requestExternalLink = useCallback((href: string) => {
    setPendingHref(href)
    setDialogOpen(true)
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) {
        return
      }

      const target = event.target
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>("a")
          : null

      if (!anchor || !isGuardedExternalLink(anchor)) return

      event.preventDefault()
      requestExternalLink(anchor.href)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [requestExternalLink])

  function continueNavigation(event: ReactMouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!pendingHref) return

    const anchor = document.createElement("a")
    anchor.href = pendingHref
    anchor.rel = "noreferrer"
    anchor.dataset.skipExternalWarning = ""
    anchor.click()
  }

  let hostname = ""
  if (pendingHref) {
    try {
      hostname = new URL(pendingHref).hostname
    } catch {
      hostname = pendingHref
    }
  }

  return (
    <ExternalLinkContext.Provider value={{ requestExternalLink }}>
      {children}
      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onOpenChangeComplete={(open) => {
          if (!open) {
            setPendingHref(undefined)
          }
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ExternalLink />
            </AlertDialogMedia>
            <AlertDialogTitle>{copy.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {copy.description}{" "}
              <strong className="break-all text-foreground">{hostname}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={continueNavigation}>
              {copy.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ExternalLinkContext.Provider>
  )
}

export function useExternalLinkGuard() {
  const context = useContext(ExternalLinkContext)
  if (!context) {
    throw new Error(
      "useExternalLinkGuard must be used within ExternalLinkGuard"
    )
  }
  return context
}
