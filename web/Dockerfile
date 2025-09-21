# Aletheia Web Frontend
# FROM node:20.17.0-alpine3.20 AS base
FROM node:24.8.0-alpine3.22 AS base

# pnpm setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# requires node >=22.14.0, see https://github.com/pnpm/pnpm/issues/9029#issuecomment-2650658230
RUN corepack enable pnpm


# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch
RUN pnpm install --offline

# Rebuild the source code only when needed
FROM base AS build

WORKDIR /app

COPY --from=deps /pnpm/store /pnpm/store
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

ARG BUILD_TIME
ARG COMMIT_SHA
ARG COMMIT_TIME
ARG VERSION

ENV NEXT_PUBLIC_BUILD_TIME=${BUILD_TIME}
ENV NEXT_PUBLIC_COMMIT_SHA=${COMMIT_SHA}
ENV NEXT_PUBLIC_COMMIT_TIME=${COMMIT_TIME}
ENV NEXT_PUBLIC_VERSION=${VERSION}

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS run

WORKDIR /app

ENV NODE_ENV="production"

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ARG BUILD_TIME
ARG COMMIT_SHA
ARG COMMIT_TIME
ARG VERSION

ENV BUILD_TIME=${BUILD_TIME}
ENV COMMIT_SHA=${COMMIT_SHA}
ENV COMMIT_TIME=${COMMIT_TIME}
ENV VERSION=${VERSION}

# NEXT_PUBLIC_ env are set at build time (see above) and included in the client bundle
# so changing this later does not affect the values on the client side (website)
ENV NEXT_PUBLIC_BUILD_TIME=${BUILD_TIME}
ENV NEXT_PUBLIC_COMMIT_SHA=${COMMIT_SHA}
ENV NEXT_PUBLIC_COMMIT_TIME=${COMMIT_TIME}
ENV NEXT_PUBLIC_VERSION=${VERSION}

ENV PORT=3000

EXPOSE ${PORT}

# set internal hostname for dns resolution in /etc/hosts
# ENV HOSTNAME="0.0.0.0"
# ENV HOSTNAME=localhost

CMD ["node", "server.js"]
