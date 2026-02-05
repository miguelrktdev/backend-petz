import type { OTP } from "@/generated/prisma/client.ts"
import type { OTPCreateInput } from "@/generated/prisma/models.ts"
import { prisma } from "@/shared/lib/prisma.ts"
import type { OTPRepository } from "./otp.repository.ts"

export class PrismaOTPRepository implements OTPRepository {
	async create(data: OTPCreateInput): Promise<OTP> {
		const otp = await prisma.oTP.create({
			data,
		})
		return otp
	}
}
