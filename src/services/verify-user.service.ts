import { redisConnection } from "~/config/redis-connection.ts"
import { InvalidOrExpiredOTPError } from "~/errors/invalid-or-expired-otp.error.ts"
import { ResourceNotFoundError } from "~/errors/resource-not-found.error.ts"
import type { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"

interface VerifyUserServiceRequest {
  code: string
  email: string
}

type VerifyUserServiceResponse = void

export class VerifyUserService {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly otpRespository: any,
  ) {}

  async handle({ code, email }: VerifyUserServiceRequest): Promise<VerifyUserServiceResponse> {
    const storedOTP = await redisConnection.get(`otp:${email}`)

    if (!storedOTP || storedOTP !== code) {
      throw new InvalidOrExpiredOTPError()
    }

    const otp = await this.otpRespository.findByCode(storedOTP)
    const user = await this.userRepository.findByID(otp.user_id)

    if (!user) {
      throw new ResourceNotFoundError("Usuário")
    }

    await this.userRepository.update(user.id, {
      email_verified: new Date()
    })

    await redisConnection.del(`otp:${email}`)
  }
}
