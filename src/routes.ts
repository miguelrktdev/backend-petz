// src/routes.ts
import { FastifyInstance } from "fastify"
import { userRoutes } from "@/modules/users/user.routes.ts"
import { authRoutes } from "@/modules/auth/auth.routes.ts"

export async function routes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/users" })
  app.register(authRoutes, { prefix: "/auth" })
}
