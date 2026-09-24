import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/offline", destination: "/offline.html" }]
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/offline.html",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ]
  },
  output: "standalone",
  // Installation metadata must be present in the initial <head>, including
  // Safari's Add to Home Screen flow, rather than streamed into the body.
  htmlLimitedBots: /.*/,
}

export default nextConfig
