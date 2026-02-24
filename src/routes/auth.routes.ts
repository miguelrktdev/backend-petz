import type { FastifyInstance } from "fastify"
import { registerUserController } from "~/controllers/register.controller.ts"

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", registerUserController)
}
