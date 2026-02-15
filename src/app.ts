// src/app.ts
import Fastify from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import { routes } from "@/routes.ts"
import { env } from "@/env.ts"
import { ZodError } from "zod"
import { StatusCodes } from "http-status-codes"

export function buildApp() {
  const app = Fastify()

  // Plugins
  app.register(fastifyCookie)
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: "refreshToken",
      signed: false,
    },
  })
  app.register(fastifyCors)

  // Rotas
  app.register(routes, { prefix: "/api" })
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ message: error.message })
    }

    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal server error",
    })
  })

  return app
}
