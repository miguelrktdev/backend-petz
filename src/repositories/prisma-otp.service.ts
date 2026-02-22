import type { OTP } from "~/generated/prisma/client.ts"
import type { OTPCreateInput } from "~/generated/prisma/models.ts"
import type { IOTPRepository } from "./IOTPRepository.ts"
import { prisma } from "~/lib/prisma.ts"

export class PrismaOTPRepository implements IOTPRepository {
  async create(data: OTPCreateInput): Promise<OTP> {
    const otp = await prisma.oTP.create({
      data,
    })
    return otp
  }
}
