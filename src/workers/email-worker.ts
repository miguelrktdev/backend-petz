import { Worker } from "bullmq"
import { redisConnection } from "~/config/redis-connection.ts"
import { env } from "~/env.ts"
import { SendEmail } from "~/lib/send-email.ts"

interface JobProps {
  to: string
  subject: string
  text: string
  html: string
}

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, text, html } = job.data as JobProps

    const sendEmail = new SendEmail()
    await sendEmail.handle({
      to,
      from: env.SMTP_FROM,
      text,
      subject,
      html,
    })
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
)
emailWorker.on("failed", (job, err) => {
  console.error("Job falhou:", err)
})

emailWorker.on("completed", (job) => {
  console.log("Job concluído:", job.id)
})
