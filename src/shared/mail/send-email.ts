import { transporter } from "@/shared/mail/mail-provider.ts"
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js"

interface SendEmailRequest {
	from: string
	to: string
	subject: string
	text: string
	html: string
}

interface SendEmailResponse {
	emailResponse: SMTPTransport.SentMessageInfo
}

export class SendEmail {
	async handle({ from, to, subject, text, html }: SendEmailRequest): Promise<SendEmailResponse | undefined> {
		try {
			const emailResponse = await transporter.sendMail({
				from,
				to,
				subject,
				text,
				html,
			})

			return {
				emailResponse,
			}
		} catch (error) {
			console.error(error)
		}
	}
}
