import { Redis } from "ioredis"
import { env } from "~/env.ts"

export const redisConnection = new Redis({
  host: env.REDIS_HOST || "localhost",
  port: env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // Importante para usar o Redis com BullMQ
})
