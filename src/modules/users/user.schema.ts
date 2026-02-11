import z from "zod"

// Define common error messages for clarity
const minLengthError = "A senha deve ter no mínimo 8 caracteres"
const uppercaseError = "A senha deve conter pelo menos uma letra maiúscula"
const lowercaseError = "A senha deve conter pelo menos uma letra minúscula"
const numberError = "A senha deve conter pelo menos um número"
const specialCharError = "A senha deve conter pelo menos um caractere especial"

const passwordSchema = z
  .string()
  .min(8, { error: minLengthError })
  .regex(/[A-Z]/, { error: uppercaseError })
  .regex(/[a-z]/, { error: lowercaseError })
  .regex(/[0-9]/, { error: numberError })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: specialCharError })

export const userRegisterSchema = z.object({
  name: z.string().min(1, { error: "Nome é obrigatório" }).max(100),
  email: z.email({ error: "Email inválido" }),
  username: z
    .string()
    .min(3, { error: "Username deve ter no mínimo 3 caracteres" })
    .max(30, { error: "Username deve ter no máximo 30 caracteres" }),
  password: passwordSchema,
  bio: z.string().min(1, { error: "Bio é obrigatória" }).max(160),
})
