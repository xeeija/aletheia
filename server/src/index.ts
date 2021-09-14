import "reflect-metadata"
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { UserResolver } from "./resolvers/User"

const main = async () => {

  // # Web Server
  const app = express()

  // # Graphql Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false
    }),
    // context: () => ({}),
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