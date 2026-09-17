import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Installation metadata must be present in the initial <head>, including
  // Safari's Add to Home Screen flow, rather than streamed into the body.
  htmlLimitedBots: /.*/,
};

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

export default withSerwist(nextConfig);
