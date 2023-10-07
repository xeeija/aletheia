import { PrismaClient } from "@prisma/client"
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import PGStore from "connect-pg-simple"
import cors from "cors"
import express from "express"
import session from "express-session"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { Resolvers } from "./resolvers"
import { ClientToServerEvents, GraphqlContext, ServerToClientEvents } from "./types"
// import { slugTest } from "./utils/slug"
import { createServer } from "http"
import { Server } from "socket.io"
import { randomWheelHandlers } from "./socket"
import { handleTwitchRoutes as twitchRouter } from "./twitch/api"
import { handleTokenValidation, setupAuthProvider } from "./twitch/auth"
import { apiClient, eventSubMiddleware, handleEventSub } from "./twitch/eventsub"

// Database client
// Create one instance and pass it around is the best practice for prisma
const prisma = new PrismaClient()

prisma.$on("beforeExit", async () => {
  await prisma.$disconnect()
  console.log("Prisma disconnected")
})

const main = async () => {

  // # Web Server
  const app = express()
  const httpServer = createServer(app)

  const PostgresStore = PGStore(session)

  const originUrl = (process.env.ORIGIN_URL)?.split(" ").filter(o => o)

  // Set cors globally, Allowed-Origin header can't be '*' if credentials are set to true
  app.use(cors({
    credentials: true,
    origin: originUrl,
  }))

  if (!process.env.SESSION_SECRET) {
    console.warn("No session secret is set")
  }

  // Session
  app.use(session({
    name: "asid",
    secret: process.env.SESSION_SECRET?.split(" ").filter(s => s) ?? "sh!fAei%shda&Dbffe$uKso/UkdhjLai)sdn",
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
    })
  }))

  // Websocket

  // TODO: Add typescript hints as type params
  const socketIo = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    path: process.env.WEBSOCKET_PATH ?? "/socket",
    cors: {
      origin: originUrl,
    },
  })

  socketIo.on("connection", (socket) => {
    randomWheelHandlers(socket, {
      socketIo,
      prisma
    })
  })

  // # Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: Resolvers,
      validate: false
    }),
    context: ({ req, res }): GraphqlContext => ({
      req,
      res,
      prisma,
      socketIo,
      apiClient,
      eventSub: eventSubMiddleware
    }),
    cache: "bounded",
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })

  // TODO Test
  // app.get("/slug/:slug", slugTest)

  // Known bug, fix for error "must start before applyMiddleware"
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false })

  // Twitch Integration

  eventSubMiddleware.apply(app);
  await setupAuthProvider(prisma)

  app.use("/api/twitch", await twitchRouter(prisma))

  const APP_PORT = process.env.APP_PORT ?? 4000

  httpServer.listen(APP_PORT, async () => {
    console.log(`Server started at http://localhost:${APP_PORT}`)

    await eventSubMiddleware.markAsReady();
    await handleEventSub(eventSubMiddleware, prisma, socketIo)
    await handleTokenValidation(apiClient, prisma)
  })
}

main()
// .finally(async () => {
//   await prisma.$disconnect()
// })
