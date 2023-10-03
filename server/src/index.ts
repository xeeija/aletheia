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
import { getTokenInfo } from "@twurple/auth"
import { createServer } from "http"
import { Server } from "socket.io"
import { randomWheelHandlers } from "./socket"
import { authProvider, setupAuthProvider } from "./twitch/auth"
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

  app.get("/twitch/authorize", async (req, res) => {

    // authorize user

    if (!req.session.userId) {
      // todo: send error not logged in
      res.redirect("back")
      return
    }

    const existingToken = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId
      }
    })

    // user already has an access token
    if (existingToken?.accessToken && existingToken.refreshToken) {
      // todo: 
      res.redirect("back")
      return
    }

    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.TWITCH_CLIENT_ID ?? "",
      scope: [
        "channel:read:redemptions",
      ].join(" "),
      state: "c3ab8aa609ea11e793ae92361f002672" // randomly generated unique per request
    }).toString()

    const redirectUri = `redirect_uri=${process.env.TWITCH_REDIRECT_URI}/twitch/token`

    res.redirect(`https://id.twitch.tv/oauth2/authorize?${params}&${redirectUri}`)
  })

  app.get("/twitch/token", async (req, res) => {

    // get access token for user with code

    const params = new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID ?? "",
      client_secret: process.env.TWITCH_CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      code: `${req.query.code}`
    }).toString()
    const redirectUri = `redirect_uri=${process.env.TWITCH_REDIRECT_URI}/twitch/token`

    const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}&${redirectUri}`, {
      method: "POST",
    })

    const body = await response.json()

    const tokenInfo = await getTokenInfo(body.access_token, process.env.TWITCH_CLIENT_ID)

    if (!tokenInfo.userId) {
      // res.status(400).json({ respone: body, message: "userId of token not found" })
      const errorParams = new URLSearchParams({ error: "userId of token not found" }).toString()
      res.redirect(`http://localhost:3000/settings?${errorParams}`)
      return
    }

    // const userAccessToken = 
    await prisma.userAccessToken.create({
      data: {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
        expiresIn: body.expires_in,
        obtainmentTimestamp: Date.now(),
        scope: body.scope,
        userId: req.session.userId,
        twitchUserId: tokenInfo.userId,
        twitchUsername: tokenInfo.userName
      }
    })

    authProvider.addUser(tokenInfo.userId, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      expiresIn: body.expires_in,
      obtainmentTimestamp: Date.now(),
      scope: body.scope,
    })

    // TODO: success code as query param and open a success popup
    res.redirect("http://localhost:3000/settings")

    // res.json({ respone: body, userAccessToken })

  })

  // # Start server (listen)

  const APP_PORT = process.env.APP_PORT ?? 4000

  httpServer.listen(APP_PORT, async () => {
    console.log(`Server started at http://localhost:${APP_PORT}`)

    await eventSubMiddleware.markAsReady();
    await handleEventSub(eventSubMiddleware, prisma, socketIo)

  })
}

main()
// .finally(async () => {
//   await prisma.$disconnect()
// })
