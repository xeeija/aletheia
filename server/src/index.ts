import "reflect-metadata"
import express from "express"
import session from "express-session"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/User"
import { HelloResolver } from "./resolvers/Hello"
import { MyContext } from "./types"

const main = async () => {

  // # Web Server
  const app = express()

  // TODO: save sessions to db (and convert the requires to imports)
  // this is any instead of the correct type
  // const MySQLStore = require("express-mysql-session")(session)

  // Session
  app.use(session({
    name: "asid",
    secret: "sh!fAei%shda&Dbffe$uKso/UkdhjLai)sdn",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    },
  }))


  // # Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })


  // Known bug, fix for error "must start before applyMiddleware"
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })


  // # Start server (listen)
  app.listen(4000, () => {
    console.log("Server started at localhost:4000")
  })
}

main()
  .finally(() => {
    // TODO: Disconnect prisma?
    // But then I'd need to pass it as context to graphql resolvers?
  })