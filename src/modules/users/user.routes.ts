import { Router } from "express"
import { userRegisterController } from "./user.controller.ts"

export const userRouter = Router()

userRouter.post("/register", userRegisterController)
