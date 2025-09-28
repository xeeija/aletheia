# Aletheia Server
FROM node:24.8.0-alpine3.22 AS base


# Install dependencies only when needed
FROM base AS build
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

RUN apk add --update --no-cache curl
RUN curl -sf https://gobinaries.com/tj/node-prune@v1.2.0 | sh

# pnpm setup
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# requires node >=22.14.0, see https://github.com/pnpm/pnpm/issues/9029#issuecomment-2650658230
RUN corepack enable pnpm

WORKDIR /server

COPY prisma ./prisma

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# RUN pnpm fetch
RUN pnpm install --frozen-lockfile

# mount pnpm store from host? - not useful for building on CI
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# Rebuild the source code only when needed
# FROM deps AS build

# WORKDIR /server

# COPY --from=deps /pnpm/store /pnpm/store
# COPY --from=deps /server/node_modules ./node_modules
COPY . .

# Prisma error with node:16-alpine (fixed in prisma@4.8.0) https://github.com/prisma/prisma/issues/16834#issuecomment-1355195025
# RUN apk add --no-cache openssl1.1-compat

RUN pnpm run generate

RUN pnpm run build

# remove tsc build info files from incremental build (not needed, saves space)
RUN rm ./dist/*.tsbuildinfo

RUN rm -Rf ./node_modules

# TODO: Use a bundler like webpack or vite if possible
# Install again without dev dependencies
# RUN rm -Rf ./node_modules

# install only prod dependencies and clean dev dependencies from node_modules
RUN pnpm install --prod --offline --frozen-lockfile --no-optional

# remove prisma files for unused databases
RUN cd node_modules/@prisma/client/runtime && ls | grep -E "cockroachdb|mysql|sqlite|sqlserver|react-native|edge|browser" | xargs rm -f

# remove .js files (both .js and .mjs are available), except library or client
# RUN cd node_modules/@prisma/client/runtime && ls | grep -E ".js" | grep -v -E "library|client" | xargs rm -f

RUN node-prune

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
