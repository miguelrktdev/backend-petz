import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	EMAIL_USER: z.string(),
	EMAIL_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error("Invalid Environments Variables")
	throw new Error("Invalid Environments Variables")
}

export const env = _env.data
