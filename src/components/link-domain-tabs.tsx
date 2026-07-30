"use client"

import { useState, type ReactNode } from "react"
import { ShieldAlert } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { linkDomains, type LinkDomain } from "@/data/profile"

type LinkDomainTabsProps = {
  content: Record<LinkDomain, ReactNode>
  labels: Record<LinkDomain, string>
  agePrompt: {
    title: string
    description: string
    cancel: string
    confirm: string
  }
}

export function LinkDomainTabs({
  content,
  labels,
  agePrompt,
}: LinkDomainTabsProps) {
  const [activeDomain, setActiveDomain] = useState<LinkDomain>("general")
  const [pendingAgeCheck, setPendingAgeCheck] = useState(false)

  function handleDomainChange(value: string) {
    const domain = value as LinkDomain

    if (domain === "unknown") {
      setPendingAgeCheck(true)
      return
    }

    setActiveDomain(domain)
  }

  function confirmAge() {
    setPendingAgeCheck(false)
    setActiveDomain("unknown")
  }

  return (
    <>
      <Tabs
        value={activeDomain}
        onValueChange={handleDomainChange}
        className="w-full min-w-0 gap-4"
      >
        <div className="sticky top-2 z-10 rounded-xl border bg-card/95 px-3 pb-2 pt-1.5 shadow-sm backdrop-blur-md">
          <TabsList variant="line" className="h-9 w-full">
            {linkDomains.map((domain) => (
              <TabsTrigger key={domain} value={domain}>
                {labels[domain]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {linkDomains.map((domain) => (
          <TabsContent
            key={domain}
            value={domain}
            aria-label={labels[domain]}
            className="grid w-full min-w-0 gap-3 overflow-hidden"
          >
            {content[domain]}
          </TabsContent>
        ))}
      </Tabs>

      <AlertDialog open={pendingAgeCheck} onOpenChange={setPendingAgeCheck}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <ShieldAlert />
            </AlertDialogMedia>
            <AlertDialogTitle>{agePrompt.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {agePrompt.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{agePrompt.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAge}>
              {agePrompt.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
