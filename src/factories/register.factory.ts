import { PrismaOTPRepository } from "~/repositories/prisma-otp.service.ts"
import { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"
import { RegisterUserService } from "~/services/register.service.ts"

export class UserRegisterFactory {
  handle() {
    const userRepository = new PrismaUserRepository()
    const otpRepository = new PrismaOTPRepository()
    const registerUserService = new RegisterUserService(userRepository, otpRepository)
    return {
      registerUserService,
    }
  }
}
