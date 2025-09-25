import { PrismaClient } from "@/generated/prisma/client.js"
import { logger } from "@/utils/index.js"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library.js"

export const errorsDatabase = new Map<number, string>()

const maxErrors = Number(process.env.PRISMA_ERROR_MAX) || 3
const errorTimeoutWindow = Number(process.env.PRISMA_ERROR_WINDOW) || 60_000
const checkError =
  process.env.PRISMA_ERROR_ENABLE !== "0" &&
  (process.env.NODE_ENV === "production" || process.env.PRISMA_ERROR_ENABLE === "1")

export const handleDatabaseError = (error: Error) => {
  if (checkError && error instanceof PrismaClientInitializationError) {
    const errorKey = Date.now()
    errorsDatabase.set(errorKey, `${error.name}: ${error.message}`)

    if (errorsDatabase.size > maxErrors) {
      process.exit(1)
    }

    setTimeout(() => errorsDatabase.delete(errorKey), errorTimeoutWindow)
  }
}

export const checkInitialDatabase = async (prisma: PrismaClient) => {
  if (!checkError) {
    return
  }

  try {
    await prisma.$connect()
  } catch (err) {
    logger.error(err)

    if (err instanceof PrismaClientInitializationError) {
      await new Promise((resolve) => setTimeout(resolve, Number(process.env.PRISMA_ERROR_TIMEOUT) || 5_000))
      process.exit(1)
    }
  }
}
