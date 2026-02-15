// src/modules/auth/auth.routes.ts
import { OTPVerifyController } from "@/modules/otp/otp.controller.ts"
import { FastifyInstance } from "fastify"
import { userAuthenticateController } from "./auth.controller.ts"

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", userAuthenticateController)
  app.post("/verify-otp", OTPVerifyController)
}
