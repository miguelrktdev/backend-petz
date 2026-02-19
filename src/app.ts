import fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import { ZodError } from "zod"
import { StatusCodes } from "http-status-codes"

export const app = fastify()

app.register(cors, {
  origin: false,
})
app.register(helmet)
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: error.message,
    })
  }
  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "Internal Server Error",
  })
})
