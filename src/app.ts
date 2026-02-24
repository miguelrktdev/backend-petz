import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import fastify from "fastify"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"
import { mainRoutes } from "./routes/index.ts"

export const app = fastify()

app.register(cors, {
  origin: false,
})
app.register(helmet)
app.register(mainRoutes, { prefix: "/api" })
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    })
  }
  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: error,
  })
})
