import { Queue } from "bullmq"
import { redisConnection } from "~/config/redis-connection.ts"

export const mailQueue = new Queue("email-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 100 },
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
})
