import nodemailer from "nodemailer"
import type { MailOptions } from "nodemailer/lib/sendmail-transport/index.js"
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js"
import { env } from "~/env.ts"

export class SendEmail {
  public transport = nodemailer.createTransport({
    service: env.SMTP_HOST,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  })

  async handle(payload: MailOptions): Promise<SMTPTransport.SentMessageInfo | undefined> {
    try {
      const mail = await this.transport.sendMail(payload)
      return mail
    } catch (error) {
      console.error(error)
    }
  }
}
