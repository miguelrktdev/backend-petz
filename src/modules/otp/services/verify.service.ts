import type { PrismaUserRepository } from "@/modules/users/prisma-user.repository.ts"
import { OTPInvalidOrExpiredError } from "@/shared/errors/otp-invalid-or-expired.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import type { PrismaOTPRepository } from "../prisma-otp.repository.ts"

interface OTPVerifyServiceRequest {
	code: string
}

type OTPVerifyServiceResponse = void

export class OTPVerifyService {
	constructor(
		private otpRepository: PrismaOTPRepository,
		private userRepository: PrismaUserRepository,
	) {}

	async handle({ code }: OTPVerifyServiceRequest): Promise<OTPVerifyServiceResponse> {
		const record = await this.otpRepository.findByCode(code)

		if (!record) {
			throw new ResourceNotFoundError("OTP")
		}

		if (record.revoked_at || record.expires_at < new Date()) {
			throw new OTPInvalidOrExpiredError()
		}

		const user = await this.userRepository.findById(record.user_id)

		if (!user) {
			throw new ResourceNotFoundError("Usuário")
		}

		await this.userRepository.update(user.id, {
			email_verified_at: new Date(),
		})

		await this.otpRepository.delete(record.id)
	}
}
