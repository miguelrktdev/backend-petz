import type z from "zod/v3"
import { register } from "~/validators/user.validators.ts"

export type UserRegisterTypeInfer = z.infer<typeof register>
