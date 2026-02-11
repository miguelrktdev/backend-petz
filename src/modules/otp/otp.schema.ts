import z from "zod"

export const OTPVerifySchema = z.object({
  code: z.string().min(1, { error: "Código OTP obrigatório" }),
})
