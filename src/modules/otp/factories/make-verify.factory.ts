import { PrismaUserRepository } from "@/modules/users/prisma-user.repository.ts"
import { PrismaOTPRepository } from "../prisma-otp.repository.ts"
import { OTPVerifyService } from "../services/verify.service.ts"

export class OTPVerifyFactory {
	handle() {
		const otpRepository = new PrismaOTPRepository()
		const userRepository = new PrismaUserRepository()
		const otpVerifyService = new OTPVerifyService(otpRepository, userRepository)
		return {
			otpVerifyService,
		}
	}
}
