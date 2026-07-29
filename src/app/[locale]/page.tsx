import {
  ArrowUpRight,
  Mail,
} from "lucide-react"
import { notFound } from "next/navigation"

import { LanguageSelect } from "@/components/language-select"
import { LinkCommandMenu } from "@/components/link-command-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { ScrollControls } from "@/components/scroll-controls"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getProfileContent,
  getProfileLinks,
  isSupportedLocale,
  profileData,
} from "@/data/profile"
import { linkIconMap } from "@/lib/link-icons"

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
  const canonicalUrl = new URL(`/${locale}`, profileData.siteUrl).toString()
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
      <ScrollControls label={content.backToTop} />
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{content.badge}</Badge>
          <div className="flex items-center gap-2">
            <LinkCommandMenu
              links={links}
              locale={locale}
              contactHref={`mailto:${profileData.email}`}
              contactLabel={content.contact}
              languageLabel={content.language}
              themeLabel={content.themeToggle}
              linksLabel={content.linksLabel}
              openLabel={content.commandOpen}
              title={content.commandTitle}
              description={content.commandDescription}
              placeholder={content.commandPlaceholder}
              emptyLabel={content.commandEmpty}
              actionsLabel={content.commandActions}
            />
            <LanguageSelect locale={locale} label={content.language} />
            <ModeToggle label={content.themeToggle} />
          </div>
        </div>

        <Card className="py-0">
          <CardContent className="flex flex-col items-center px-6 py-7 text-center">
            <Avatar className="size-24">
              <AvatarImage src={profileData.avatar} alt={content.name} />
              <AvatarFallback>{content.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <h1 className="mt-4 text-2xl font-semibold">{content.handle}</h1>
            {content.description ? (
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                {content.description}
              </p>
            ) : null}
            <Separator className="my-5" />
            <Button
              render={<a href={`mailto:${profileData.email}`} />}
              nativeButton={false}
              variant="outline"
              className="w-full"
            >
              <Mail />
              {content.contact}
            </Button>
          </CardContent>
        </Card>

        <section aria-label={content.linksLabel} className="grid gap-3">
          {links.map((item) => {
            const Icon = linkIconMap[item.icon]

            return (
              <Button
                key={`${item.title}-${item.href}`}
                render={
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  />
                }
                nativeButton={false}
                variant="outline"
                className="h-auto w-full justify-between px-4 py-3"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-4" />
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-medium">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="block truncate text-xs opacity-70">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </span>
                <ArrowUpRight className="size-4" />
              </Button>
            )
          })}
        </section>

        <footer className="pb-2 pt-1 text-center text-xs text-muted-foreground">
          © 2026 Canis
        </footer>
      </div>
    </main>
  )
}
