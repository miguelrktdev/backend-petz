import type { FastifyInstance } from "fastify"
import { authenticateUserController } from "~/controllers/authenticate.controller.ts"
import { registerUserController } from "~/controllers/register.controller.ts"

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", registerUserController)
  app.post("/sessions", authenticateUserController)
}
