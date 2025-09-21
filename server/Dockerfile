# Aletheia Server
FROM node:22.19.0-alpine3.22 AS base
# 24.8.0-alpine3.22

# pnpm setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# requires node >=22.14.0, see https://github.com/pnpm/pnpm/issues/9029#issuecomment-2650658230
RUN corepack enable pnpm

# Prisma libssl https://github.com/prisma/prisma/issues/25817#issuecomment-2678038486
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3


# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /server

COPY prisma ./prisma

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch
RUN pnpm install --offline

# mount pnpm store from host? - not useful for building on CI
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS build

WORKDIR /server

COPY --from=deps /pnpm/store /pnpm/store
COPY --from=deps /server/node_modules ./node_modules
COPY . .

# Prisma error with node:16-alpine (fixed in prisma@4.8.0) https://github.com/prisma/prisma/issues/16834#issuecomment-1355195025
# RUN apk add --no-cache openssl1.1-compat

# RUN pnpm run generate

RUN pnpm run build

# remove tsc build info files from incremental build (not needed, saves space)
RUN rm ./dist/*.tsbuildinfo

# TODO: Use a bundler like webpack or vite if possible
# Install again without dev dependencies
# RUN rm -Rf ./node_modules

# install only prod dependencies and clean dev dependencies from node_modules
RUN pnpm install --prod --offline
RUN pnpm prune --prod

COPY package.json ./dist


# Production image, copy all the files and run
FROM base AS run

WORKDIR /server

COPY --from=build /server/node_modules/ ./node_modules
COPY --from=build /server/dist ./dist

ARG BUILD_TIME
ARG COMMIT_SHA
ARG COMMIT_TIME
ARG VERSION

ENV NODE_ENV="production"
ENV BUILD_TIME=${BUILD_TIME}
ENV COMMIT_SHA=${COMMIT_SHA}
ENV COMMIT_TIME=${COMMIT_TIME}
ENV VERSION=${VERSION}

ENV PORT=4000

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
