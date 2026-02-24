import { z } from "zod/v3"

const minMessageError = (fieldName: string) => {
  return `${fieldName} obrigatório`
}

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const register = z
  .object({
    name: z.string().min(1, { message: minMessageError("Nome") }),
    username: z.string().min(1, { message: minMessageError("Nome de usuário") }),
    email: z
      .string()
      .min(1, { message: minMessageError("E-mail") })
      .email({ message: "Formato de e-mail inválido" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const userValidators = {
  register,
}
