import { env } from "@/env.ts"
import type { OTP, User } from "@/generated/prisma/client.ts"
import type { CreateService } from "@/modules/otp/services/create.service.ts"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists.error.ts"
import type { SendEmail } from "@/shared/mail/send-email.ts"
import { otpVerificationEmailTemplate } from "@/shared/mail/templates/otp-verification-email.ts"
import bcrypt from "bcryptjs"
import type { PrismaUserRepository } from "../prisma-user.repository.ts"

interface RegisterServiceRequest {
	name: string
	username: string
	email: string
	password: string
	bio: string
}

interface RegisterServiceResponse {
	user: User
	otp: OTP
}

export class RegisterService {
	constructor(
		private userRepository: PrismaUserRepository,
		private otpService: CreateService,
		private sendEmail: SendEmail,
	) {}

	async handle({ name, username, email, password, bio }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
		const doesUserExistsWithSameUsername = await this.userRepository.findByUsername(username)
		const doesUserExistsWithSameEmail = await this.userRepository.findByEmail(email)

		if (doesUserExistsWithSameEmail || doesUserExistsWithSameUsername) {
			throw new UserAlreadyExistsError()
		}

		const password_hash = await bcrypt.hash(password, 6)

		const userPayload = {
			name,
			username,
			email,
			password_hash,
			bio,
		}
		const user = await this.userRepository.create(userPayload)

		const otpPayload = {
			userId: user.id,
		}
		const { otp } = await this.otpService.handle(otpPayload)

		const emailTemplate = otpVerificationEmailTemplate({
			name: user.name,
			otp: otp.token,
		})

		await this.sendEmail.handle({
			from: `Suporte Petz Social Media <${env.EMAIL_USER}>`,
			to: user.email,
			subject: "Verifique seu e-mail",
			text: "Verifique seu e-mail",
			html: emailTemplate,
		})

		return {
			user,
			otp,
		}
	}
}
