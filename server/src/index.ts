import "reflect-metadata" // must be before any resolvers or type-graphql imports

import { Resolvers } from "@/resolvers"
import { socketHandlers } from "@/socket"
import {
  apiClient,
  eventSubMiddleware,
  handleEventSub,
  handleTokenValidation,
  setupAuthProvider,
  twitchRouter,
} from "@/twitch"
import type { ClientToServerEvents, GraphqlContext, InterServerEvents, ServerToClientEvents, SocketData } from "@/types"
import { checkInitialDatabase, logger } from "@/utils"
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
  logger.info("Prisma disconnected")
})

const main = async () => {
  await checkInitialDatabase(prisma)

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
    logger.warn("No session secret is set")
  }

  const sessionMiddleware = session({
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

  // Session
  app.use(sessionMiddleware)

  // Websocket

  // TODO: Add typescript hints as type params
  const socketIo = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    path: process.env.SOCKET_PATH ?? "/api/socket",
    cors: {
      credentials: true,
      origin: originUrl,
    },
  })

  socketIo.engine.use(sessionMiddleware)

  // const sessionReloadInterval = 60 * 60 * 1000

  socketIo.on("connection", (socket) => {
    // periodically reload the session
    // const timer = setInterval(() => {
    //   socket.request.session.reload((err?: Error) => {
    //     if (err) {
    //       // debug
    //       // console.warn("[websocket] error reloading session:", socket.id, err)

    //       // forces the client to reconnect
    //       socket.conn.close()
    //     }
    //   })
    // }, sessionReloadInterval)

    // socket.on("disconnect", () => {
    //   clearInterval(timer)
    // })

    // reload the session on a connection
    // reloading fails with an error if the request has no session, so user is not logged in
    // socket.use((_, next) => {
    //   socket.request.session.reload((err?: Error) => {
    //     console.warn("[websocket] Error: id", socket.id.slice(0, 6), err)

    //     if (err) {
    //       if (err.message !== "failed to load session") {
    //         console.warn("[websocket] Error: id", socket.id.slice(0, 6), err.message)
    //       }

    //       socket.disconnect()
    //     } else {
    //       next()
    //     }
    //   })
    // })

    socketHandlers.forEach((handler) => handler(socket, { socketIo, prisma }))
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
  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: "/api/graphql",
  })

  // Twitch Integration

  eventSubMiddleware.apply(app)
  await setupAuthProvider(prisma)

  app.use("/api/twitch", twitchRouter(apiClient, prisma))

  const APP_PORT = parseInt(process.env.APP_PORT ?? "") || 4000

  httpServer.listen(APP_PORT, async () => {
    logger.info(`Server started at http://localhost:${APP_PORT}`)

    await eventSubMiddleware.markAsReady()
    await handleEventSub(eventSubMiddleware, prisma, socketIo)
    handleTokenValidation(apiClient, prisma)
  })

  process.on("unhandledRejection", (error) => {
    logger.error("Unhandled promise rejection:", error)
  })

  process.on("SIGTERM", () => {
    logger.info("Shutting down...")

    // client.destroy()
    httpServer.close((err) => {
      if (err) {
        logger.error("Server closed with error:", err)
      } else {
        logger.info("Server closed")
      }
    })
  })
}

void main()
// .finally(async () => {
//   await prisma.$disconnect()
// })
