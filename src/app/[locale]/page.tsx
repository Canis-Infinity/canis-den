import { ArrowUpRight, PawPrint } from "lucide-react"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import { LanguageSelect } from "@/components/language-select"
import { ContactDialog } from "@/components/contact-dialog"
import { LinkCommandMenu } from "@/components/link-command-menu"
import { LinkDomainTabs } from "@/components/link-domain-tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { ResponsiveTooltip } from "@/components/responsive-tooltip"
import { ScrollControls } from "@/components/scroll-controls"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import {
  getProfileContent,
  getProfileLinks,
  linkDomains,
  profileData,
} from "@/data/profile"
import { isSupportedLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { getLinkPlatform, linkIconMap } from "@/lib/link-icons"
import {
  getLinkDomainHref,
  parseLinkDomainSlug,
} from "@/lib/link-domain-route"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getProfileContent(locale)
  const links = getProfileLinks(locale)
  const dictionary = getDictionary(locale)
  const requestHeaders = await headers()
  const activeDomain =
    parseLinkDomainSlug(requestHeaders.get("x-link-domain")) ?? "general"
  const domainLabels = Object.fromEntries(
    linkDomains.map((domain) => [domain, dictionary.domains[domain].label])
  ) as Record<(typeof linkDomains)[number], string>
  const domainDescriptions = Object.fromEntries(
    linkDomains.map((domain) => [
      domain,
      dictionary.domains[domain].description,
    ])
  ) as Record<(typeof linkDomains)[number], string>
  const renderDomain = (domain: (typeof linkDomains)[number]) => (
    <ItemGroup className="gap-3">
      {links
        .filter((item) => item.domain.includes(domain))
        .map((item) => {
          const Icon = linkIconMap[item.icon]

          return (
            <ResponsiveTooltip
              key={`${item.title}-${item.href}`}
              label={
                <span className="flex max-w-64 flex-col gap-0.5">
                  <span>{dictionary.domains[domain].tooltip}</span>
                  <span className="text-background/70">
                    {dictionary.externalLink.destination}{" "}
                    {getLinkPlatform(item)}
                  </span>
                </span>
              }
              side="right"
            >
              <Item
                role="listitem"
                render={
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  />
                }
                variant="outline"
                className="min-w-0 flex-nowrap overflow-hidden px-4 py-3"
              >
                <ItemMedia variant="icon">
                  <Icon />
                </ItemMedia>
                <ItemContent className="min-w-0 gap-0">
                  <ItemTitle>{item.title}</ItemTitle>
                  {item.description ? (
                    <ItemDescription className="line-clamp-3 text-pretty text-xs leading-relaxed">
                      {item.description}
                    </ItemDescription>
                  ) : null}
                </ItemContent>
                <ItemActions>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </ItemActions>
              </Item>
            </ResponsiveTooltip>
          )
        })}
    </ItemGroup>
  )
  const domainContent = {
    general: renderDomain("general"),
    afterDark: renderDomain("afterDark"),
    work: renderDomain("work"),
  }
  const canonicalUrl = new URL(
    getLinkDomainHref(activeDomain, locale),
    profileData.siteUrl
  ).toString()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: content.metadataTitle,
    url: canonicalUrl,
    description: content.metadataDescription,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: content.name,
      alternateName: content.handle,
      image: new URL(profileData.avatar, profileData.siteUrl).toString(),
      email: profileData.email,
      url: canonicalUrl,
      sameAs: links.filter((link) => link.external).map((link) => link.href),
    },
    hasPart: {
      "@type": "ItemList",
      itemListElement: links.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: link.title,
        url: link.href,
      })),
    },
  }

  return (
    <main className="min-h-svh bg-muted/30 px-4 py-6 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollControls label={dictionary.profile.backToTop} />
      <div className="mx-auto flex w-full max-w-md min-w-0 flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            <PawPrint className="size-3" aria-hidden="true" />
            {content.badge}
          </Badge>
          <div className="flex items-center gap-2">
            <LinkCommandMenu
              links={links}
              locale={locale}
              contactHref={`mailto:${profileData.email}`}
              contactLabel={dictionary.profile.contact}
              languageLabel={dictionary.profile.language}
              themeLabel={dictionary.profile.themeToggle}
              linksLabel={dictionary.profile.linksLabel}
              openLabel={dictionary.command.open}
              title={dictionary.command.title}
              description={dictionary.command.description}
              placeholder={dictionary.command.placeholder}
              emptyLabel={dictionary.command.empty}
              actionsLabel={dictionary.command.actions}
            />
            <LanguageSelect
              locale={locale}
              label={dictionary.profile.language}
            />
            <ModeToggle label={dictionary.profile.themeToggle} />
          </div>
        </div>

        <Card className="py-0">
          <CardContent className="flex flex-col items-center px-6 pt-7 pb-5 text-center">
            <Avatar className="size-24">
              <AvatarImage src={profileData.avatar} alt={content.name} />
              <AvatarFallback>{content.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-2xl font-semibold">{content.handle}</h1>
            {content.description ? (
              <p className="mt-3 max-w-xs text-pretty text-sm leading-6 text-muted-foreground">
                {content.description}
              </p>
            ) : null}
            <Separator className="my-5" />
            <ContactDialog
              locale={locale}
              triggerLabel={dictionary.profile.contact}
              copy={dictionary.contact}
            />
          </CardContent>
        </Card>

        <LinkDomainTabs
          locale={locale}
          content={domainContent}
          labels={domainLabels}
          descriptions={domainDescriptions}
          agePrompt={dictionary.agePrompt}
          ageDenied={dictionary.ageDenied}
        />

        <SiteFooter
          locale={locale}
          languageLabel={dictionary.profile.language}
          themeLabel={dictionary.profile.themeToggle}
          cookieSettings={dictionary.cookies.settings}
          rightsReserved={dictionary.footer.rightsReserved}
        />
      </div>
    </main>
  )
}
