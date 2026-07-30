"use client"

import type { ReactNode } from "react"

import { AgeGateDialogs } from "@/components/age-gate-dialogs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { linkDomains, type LinkDomain } from "@/data/profile"
import { useLinkDomainNavigation } from "@/hooks/use-link-domain-navigation"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/types"

type LinkDomainTabsProps = {
  content: Record<LinkDomain, ReactNode>
  labels: Record<LinkDomain, string>
  descriptions: Record<LinkDomain, string>
  locale: Locale
  agePrompt: Dictionary["agePrompt"]
  ageDenied: Dictionary["ageDenied"]
}

export function LinkDomainTabs({
  content,
  labels,
  descriptions,
  locale,
  agePrompt,
  ageDenied,
}: LinkDomainTabsProps) {
  const navigation = useLinkDomainNavigation(locale)

  return (
    <>
      <Tabs
        value={navigation.activeDomain}
        onValueChange={(value) =>
          navigation.requestDomain(value as LinkDomain)
        }
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

        <p className="px-2 text-center text-pretty text-sm leading-6 text-muted-foreground">
          {descriptions[navigation.activeDomain]}
        </p>

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

      <AgeGateDialogs
        promptOpen={navigation.agePromptOpen}
        deniedOpen={navigation.ageDeniedOpen}
        prompt={agePrompt}
        denied={ageDenied}
        onConfirm={navigation.confirmAge}
        onDeny={navigation.denyAge}
        onChooseGeneral={() => navigation.chooseSafeDomain("general")}
        onChooseWork={() => navigation.chooseSafeDomain("work")}
      />
    </>
  )
}
