# Aletheia Server
FROM node:20.17.0-alpine3.20 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /server

COPY prisma ./prisma

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./

RUN npm ci

# Prisma
# COPY prisma ./prisma
# RUN npm i @prisma/client


# Rebuild the source code only when needed
FROM base AS build

WORKDIR /server

COPY --from=deps /server/node_modules ./node_modules
COPY . .

# Prisma error with node:16-alpine (fixed in prisma@4.8.0) https://github.com/prisma/prisma/issues/16834#issuecomment-1355195025
# RUN apk add --no-cache openssl1.1-compat

RUN npx prisma generate

RUN npm run build

# remove tsc build info files from incremental build (not needed, saves space)
RUN rm ./dist/*.tsbuildinfo

# TODO: Use a bundler like webpack or vite if possible
# Install again without dev dependencies
RUN rm -Rf ./node_modules
RUN npm ci --omit=dev

# required for running prisma
COPY --from=deps /server/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=deps /server/node_modules/@prisma/client ./node_modules/@prisma/client

# RUN echo { "type": "module" } > ./dist/package.json
# package.json with type "module" is required for import syntax
COPY package.json ./dist

# Production image, copy all the files and run
FROM base AS run

WORKDIR /server

COPY --from=build /server/dist ./dist
COPY --from=build /server/node_modules/ ./node_modules

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
