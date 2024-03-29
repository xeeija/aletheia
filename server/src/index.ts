import "reflect-metadata" // must be before any resolvers or type-graphql imports

import { Resolvers } from "@/resolvers"
import { randomWheelHandlers } from "@/socket"
import {
  apiClient,
  eventSubMiddleware,
  handleEventSub,
  handleTokenValidation,
  setupAuthProvider,
  handleTwitchRoutes as twitchRouter,
} from "@/twitch"
import type { ClientToServerEvents, GraphqlContext, InterServerEvents, ServerToClientEvents, SocketData } from "@/types"
import { PrismaClient } from "@prisma/client"
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import PGStore from "connect-pg-simple"
import cors from "cors"
import express from "express"
import session from "express-session"
import { createServer } from "http"
import { Server } from "socket.io"
import { buildSchema } from "type-graphql"

// Database client
// Create one instance and pass it around is the best practice for prisma
const prisma = new PrismaClient()

process.on("beforeExit", async () => {
  await prisma.$disconnect()
  console.log("Prisma disconnected")
})

const main = async () => {
  // # Web Server
  const app = express()
  const httpServer = createServer(app)

  const PostgresStore = PGStore(session)

  const originUrl = process.env.ORIGIN_URL?.split(" ").filter((o) => o)

  // Set cors globally, Allowed-Origin header can't be '*' if credentials are set to true
  app.use(
    cors({
      credentials: true,
      origin: originUrl,
    })
  )

  if (!process.env.SESSION_SECRET) {
    console.warn("No session secret is set")
  }

  // Session
  app.use(
    session({
      name: "asid",
      secret: process.env.SESSION_SECRET?.split(" ").filter((s) => s) ?? "sh!fAei%shda&Dbffe$uKso/UkdhjLai)sdn",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        //maxAge: 1000 * 60 * 60 * 24
      },
      store: new PostgresStore({
        tableName: "_session",
        createTableIfMissing: true,
        conString: process.env.DATABASE_URL,
      }),
    })
  )

  // Websocket

  // TODO: Add typescript hints as type params
  const socketIo = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    path: process.env.WEBSOCKET_PATH ?? "/socket",
    cors: {
      origin: originUrl,
    },
  })

  socketIo.on("connection", (socket) => {
    randomWheelHandlers(socket, {
      socketIo,
      prisma,
    })
  })

  // # Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: Resolvers,
      validate: false,
    }),
    context: ({ req, res }): GraphqlContext => ({
      req,
      res,
      prisma,
      socketIo,
      apiClient,
      eventSub: eventSubMiddleware,
    }),
    cache: "bounded",
    plugins: [
      process.env.ENABLE_GRAPHQL !== "1"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  // TODO Test
  // app.get("/slug/:slug", slugTest)

  // Known bug, fix for error "must start before applyMiddleware"
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false })

  // Twitch Integration

  eventSubMiddleware.apply(app)
  await setupAuthProvider(prisma)

  app.use("/api/twitch", twitchRouter(prisma))

  const APP_PORT = process.env.APP_PORT ?? 4000

  httpServer.listen(APP_PORT, async () => {
    console.log(`Server started at http://localhost:${APP_PORT}`)

    await eventSubMiddleware.markAsReady()
    await handleEventSub(eventSubMiddleware, prisma, socketIo)
    handleTokenValidation(apiClient, prisma)
  })
}

void main()
// .finally(async () => {
//   await prisma.$disconnect()
// })
