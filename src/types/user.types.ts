import type z from "zod/v3"
import { register, login } from "~/validators/user.validators.ts"

export type UserRegisterTypeInfer = z.infer<typeof register>
export type UserLoginTypeInfer = z.infer<typeof login>
