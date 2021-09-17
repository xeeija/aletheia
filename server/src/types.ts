import { Request, Response } from "express";

// Define custom properties on the session
declare module "express-session" {
  interface Session {
    userId: number
  }
}

// TODO: Need a better name
// Needed for GraphQL resolvers
export type MyContext = {
  req: Request
  res: Response
}