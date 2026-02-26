import "dotenv/config"
import { z } from "zod/v3"

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  SMTP_HOST: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.coerce.number(),
})

const _env = schema.safeParse(process.env)

if (!_env.success) {
  console.error(`Invalid environments variables ${_env.error.format()}`)
  throw new Error(`Invalid environments variables ${_env.error.format()}`)
}

export const env = _env.data
