import { Router } from "express"
import { OTPVerifyController } from "../otp/otp.controller.ts"
import { userAuthenticateController } from "./auth.controller.ts"

export const authRoutes = Router()

authRoutes.post("/login", userAuthenticateController)
authRoutes.post("/verify-otp", OTPVerifyController)

// test get cookie
authRoutes.get("/test-cookies", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    console.log("Refresh Token from Cookies:", refreshToken)
    return res.json({ refreshToken })
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
})

// test clear cookie
authRoutes.get("/clear-cookies", async (_req, res) => {
  try {
    res.clearCookie("refreshToken")
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
})
