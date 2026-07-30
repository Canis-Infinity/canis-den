/* eslint-disable @next/next/no-img-element */

import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { getProfileContent, profileData } from "@/data/profile"
import { isSupportedLocale } from "@/i18n/config"

export const runtime = "nodejs"
export const alt = "Canis Den"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

async function readPublicImage(path: string) {
  const file = await readFile(join(process.cwd(), "public", path))

  return `data:image/jpeg;base64,${file.toString("base64")}`
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getProfileContent(locale)
  const [background, avatar] = await Promise.all([
    readPublicImage("og.jpg"),
    readPublicImage(profileData.avatar.replace(/^\//, "")),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#080808",
        color: "#fafafa",
        fontFamily: "Arial",
      }}
    >
      <img
        src={background}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.62,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.62) 44%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "1040px",
          alignItems: "center",
          gap: "42px",
        }}
      >
        <img
          src={avatar}
          alt=""
          style={{
            width: "172px",
            height: "172px",
            borderRadius: "999px",
            border: "4px solid rgba(255,255,255,0.82)",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "720px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "fit-content",
              border: "1px solid rgba(255,255,255,0.26)",
              borderRadius: "999px",
              padding: "8px 16px",
              fontSize: "26px",
              lineHeight: 1,
              background: "rgba(0,0,0,0.42)",
            }}
          >
            {content.badge}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 0.95,
            }}
          >
            {content.handle}
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: "30px",
              lineHeight: 1.36,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            {content.metadataDescription}
          </div>
          <div
            style={{
              marginTop: "34px",
              fontSize: "24px",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            canis.world
          </div>
        </div>
      </div>
    </div>,
    size
  )
}
