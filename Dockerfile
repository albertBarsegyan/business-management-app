# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# ---- dev: next dev against bind-mounted source, used by docker-compose.yml ----
FROM base AS dev
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# ---- builder: next build (requires output: "standalone" in next.config.ts) ----
FROM base AS builder
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- runner: minimal runtime image, used by docker-compose.prod.yml ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
