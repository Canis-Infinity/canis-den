FROM node:24-bullseye-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

FROM base AS builder

ARG NEXT_PUBLIC_SITE_URL
ARG INTERNAL_API_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV INTERNAL_API_BASE_URL=${INTERNAL_API_BASE_URL}
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=7342

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 7342

CMD ["node", "server.js"]
