import type { OTP } from "@/generated/prisma/client.ts"
import type { OTPCreateInput } from "@/generated/prisma/models.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import dayjs from "dayjs"
import type { PrismaOTPRepository } from "../prisma-otp.repository.ts"

interface CreateServiceRequest {
  userId: string
}

interface CreateServiceResponse {
  otp: OTP
}

export class CreateService {
  constructor(private otpRepository: PrismaOTPRepository) {}

  async handle({ userId }: CreateServiceRequest): Promise<CreateServiceResponse> {
    if (!userId) {
      throw new ResourceNotFoundError("Usuário")
    }

    const otpPayload: OTPCreateInput = {
      token: Math.floor(100000 + Math.random() * 900000).toString(),
      expires_at: dayjs().add(15, "minutes").toDate(),
      User: {
        connect: {
          id: userId,
        },
      },
    }

    const otp = await this.otpRepository.create(otpPayload)

    return {
      otp,
    }
  }
}
