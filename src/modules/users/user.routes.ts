import type { FastifyInstance } from "fastify"
import { userRegisterController } from "./user.controller.ts"

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/register", userRegisterController)
}
