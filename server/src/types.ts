import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

// Define custom properties on the session
declare module "express-session" {
  interface Session {
    userId: string
  }
}

// TODO: Need a better name
// Needed for GraphQL resolvers
export type MyContext = {
  req: Request
  res: Response
  prisma: PrismaClient
}