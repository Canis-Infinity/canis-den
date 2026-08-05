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
        className="w-full min-w-0 gap-3"
      >
        <div className="sticky top-2 z-10 rounded-xl border bg-card/95 p-2 shadow-sm backdrop-blur-md">
          <TabsList className="w-full">
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
            className="w-full min-w-0"
          >
            <div className="grid min-w-0 gap-4 px-1 py-2">
              <p className="text-sm leading-6 text-muted-foreground">
                {descriptions[domain]}
              </p>
              <div className="grid min-w-0 gap-3">
                {content[domain]}
              </div>
            </div>
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
