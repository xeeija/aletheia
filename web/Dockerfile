FROM registry.access.redhat.com/hi/nodejs:24.22.1 AS base

ENV CONTAINER_DEFAULT_USER=65532


# Base node image with pnpm and dependencies
FROM registry.access.redhat.com/hi/nodejs:24.22.1-builder AS deps

USER root

# tar, gzip and openssl are required for installing pnpm
RUN dnf install -y tar gzip openssl && dnf clean all

USER ${CONTAINER_DEFAULT_USER}

ENV PNPM_HOME="$HOME/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

RUN curl https://get.pnpm.io/install.sh | env PNPM_VERSION=12.15.0 ENV="$HOME/.shrc" SHELL="/bin/sh" sh -

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm doctor --json --benchmark

RUN pnpm fetch


# Rebuild the source code only when needed
FROM deps AS build

WORKDIR /app

COPY --chown=${CONTAINER_DEFAULT_USER}:root package.json ./

RUN pnpm ci --offline --frozen-lockfile

COPY --chown=${CONTAINER_DEFAULT_USER}:root . .

# Disable telemetry during the build
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

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=${CONTAINER_DEFAULT_USER}:root /app/.next/standalone ./
COPY --from=build --chown=${CONTAINER_DEFAULT_USER}:root /app/.next/static ./.next/static

# USER nextjs

ARG BUILD_TIME
ARG COMMIT_SHA
ARG COMMIT_TIME
ARG VERSION

ENV BUILD_TIME=${BUILD_TIME}
ENV COMMIT_SHA=${COMMIT_SHA}
ENV COMMIT_TIME=${COMMIT_TIME}
ENV VERSION=${VERSION}

# NEXT_PUBLIC_* env are set at build time (see above) and included in the client bundle
# so changing them later does not affect the values on the client side (browser)
ENV NEXT_PUBLIC_BUILD_TIME=${BUILD_TIME}
ENV NEXT_PUBLIC_COMMIT_SHA=${COMMIT_SHA}
ENV NEXT_PUBLIC_COMMIT_TIME=${COMMIT_TIME}
ENV NEXT_PUBLIC_VERSION=${VERSION}

ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "server.js"]
