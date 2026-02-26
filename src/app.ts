import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import fastify from "fastify"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"
import { mainRoutes } from "./routes/index.ts"
import fastifyJWT from "@fastify/jwt"
import { env } from "./env.ts"

export const app = fastify()

app.register(cors, {
  origin: false,
})
app.register(helmet)
app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
})
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
