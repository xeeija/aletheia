import "reflect-metadata"
import express from "express"
import session from "express-session"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { buildSchema } from "type-graphql"
import { PrismaClient } from "@prisma/client"
import { UserResolver, RandomWheelResolver } from "./resolvers"
import { ClientToServerEvents, MyContext, ServerToClientEvents } from "./types"
import PGStore from "connect-pg-simple"
import { slugTest } from "./utils/slug"
import { Server } from "socket.io"
import { createServer } from "http"
import { randomWheelHandlers } from "./socket"

// Database client
// Create one instance and pass it around is the best practice for prisma
const prisma = new PrismaClient()

const main = async () => {

  // # Web Server
  const app = express()
  const httpServer = createServer(app)

  const PostgresStore = PGStore(session)

  // Set cors globally, Allowed-Origin header can't be '*' if credentials are set to true
  app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  }))

  if (!process.env.SESSION_SECRET) {
    console.warn("No session secret is set")
  }

  // Session
  app.use(session({
    name: "asid",
    secret: process.env.SESSION_SECRET ?? "sh!fAei%shda&Dbffe$uKso/UkdhjLai)sdn",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // sameSite: "lax" // for csrf?
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    },
    store: new PostgresStore({
      tableName: "_session",
      createTableIfMissing: true,
      conString: process.env.DATABASE_URL
    })
  }))

  // Websocket

  // TODO: Add typescript hints as type params
  const socketIo = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    path: process.env.WEBSOCKET_PATH,
    cors: {
      origin: process.env.ORIGIN_URL,
    },
  })

  socketIo.on("connection", (socket) => {
    randomWheelHandlers(socket, socketIo)
  })

  // # Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, RandomWheelResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ req, res, prisma, socketIo }),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })

  // TODO Test
  app.get("/slug/:slug", slugTest)

  // Known bug, fix for error "must start before applyMiddleware"
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false })

  // # Start server (listen)

  const APP_PORT = process.env.APP_PORT ?? 4000

  httpServer.listen(APP_PORT, () => {
    console.log(`Server started at http://localhost:${APP_PORT}`)
  })
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
