import "dotenv/config"
import { z } from "zod/v3"

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
})

const _env = schema.safeParse(process.env)

if (!_env.success) {
  console.error(`Invalid environments variables ${_env.error.format()}`)
  throw new Error(`Invalid environments variables ${_env.error.format()}`)
}

export const env = _env.data
