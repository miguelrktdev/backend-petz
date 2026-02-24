import { z } from "zod/v3"

const minMessageError = (fieldName: string) => {
  return `${fieldName} obrigatório`
}

const passwordSchema = z
  .string()
  .min(12, "A senha precisa conter no mínimo 12 caractéres")
  .regex(/[A-Z]/, "A senha precisa conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha precisa conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha precisa conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A senha precisa conter pelo menos um caractér especial")

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
    message: "As senhas fornecidas precisam ser iguais",
    path: ["confirmPassword"],
  })

export const userValidators = {
  register,
}
