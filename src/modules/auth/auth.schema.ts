import z from "zod"

export const userAuthenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
