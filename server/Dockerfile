FROM registry.access.redhat.com/hi/nodejs:24.22.1 AS base

ENV CONTAINER_DEFAULT_USER=65532


# Base node image with pnpm and dependencies
FROM registry.access.redhat.com/hi/nodejs:24.22.1-builder AS deps

USER root

# tar, gzip and openssl are required for installing pnpm
RUN dnf install -y tar gzip openssl && dnf clean all

USER ${CONTAINER_DEFAULT_USER}

# install node-prune (remove unnecessary files in node_modules to save space)
RUN curl -f https://gobinaries.com/tj/node-prune@v1.2.0 | PREFIX=$HOME sh

# install pnpm
ENV PNPM_HOME="$HOME/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

RUN curl -f https://get.pnpm.io/install.sh | env PNPM_VERSION=12.15.0 ENV="$HOME/.shrc" SHELL="/bin/sh" sh -

WORKDIR /server

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm doctor --json --benchmark

RUN pnpm fetch


# Rebuild the source code only when needed
FROM deps AS build

WORKDIR /server

COPY --chown=${CONTAINER_DEFAULT_USER}:root package.json ./

RUN pnpm ci --offline --frozen-lockfile

COPY --chown=${CONTAINER_DEFAULT_USER}:root . .

RUN pnpm run generate

RUN pnpm run build
RUN rm -f ./dist/*.tsbuildinfo

# TODO: Use a bundler like webpack or vite if possible
# Install again without dev dependencies
RUN rm -Rf ./node_modules

RUN pnpm ci --prod --offline --frozen-lockfile

# remove prisma files for unused databases
RUN cd node_modules/@prisma/client/runtime && ls | grep -E "cockroachdb|mysql|sqlite|sqlserver|react-native|edge|browser" | xargs rm -f

RUN $HOME/node-prune

COPY --chown=${CONTAINER_DEFAULT_USER}:root package.json ./dist


# Production image, copy all the files and run
FROM base AS run

WORKDIR /server

COPY --from=build --chown=${CONTAINER_DEFAULT_USER}:root /server/dist ./dist
COPY --from=build --chown=${CONTAINER_DEFAULT_USER}:root /server/node_modules/ ./node_modules

ARG BUILD_TIME
ARG COMMIT_SHA
ARG COMMIT_TIME
ARG VERSION

ENV BUILD_TIME=${BUILD_TIME}
ENV COMMIT_SHA=${COMMIT_SHA}
ENV COMMIT_TIME=${COMMIT_TIME}
ENV VERSION=${VERSION}

ENV NODE_ENV="production"

ENV PORT=4000

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
