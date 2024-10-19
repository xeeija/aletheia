"use server"

export const getEnvironment = async () => {
  return Promise.resolve(process.env.ENVIRONMENT)
}
