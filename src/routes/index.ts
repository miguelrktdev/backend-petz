import type { FastifyInstance } from "fastify"
import { authRoutes } from "~/routes/auth.routes.ts"

export const mainRoutes = async (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: "/auth" })
  app.get("/hello", async (_request, reply) => {
    return reply.status(200).send({
      success: true,
      message: "Hello world",
    })
  })
}
