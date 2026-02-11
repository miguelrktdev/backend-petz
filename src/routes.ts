import { userRouter } from "@/modules/users/user.routes.ts"
import { Router } from "express"
import { authRoutes } from "./modules/auth/auth.routes.ts"

export const routes = Router()

routes.get("/hello", (_req, res) => {
  return res.status(200).json({
    message: "Hello world",
  })
})

routes.use("/users", userRouter)
routes.use("/auth", authRoutes)
