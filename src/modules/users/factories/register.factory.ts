/** biome-ignore-all lint/complexity/noStaticOnlyClass: <> */
import { PrismaOTPRepository } from "@/modules/otp/prisma-otp.repository.ts"
import { CreateService } from "@/modules/otp/services/create.service.ts"
import { SendEmail } from "@/shared/mail/send-email.ts"
import { PrismaUserRepository } from "../prisma-user.repository.ts"
import { RegisterService } from "../services/register.service.ts"

export class RegisterUserFactory {
  static handle() {
    const prismaUserRepository = new PrismaUserRepository()
    const prismaOTPRepository = new PrismaOTPRepository()
    const otpService = new CreateService(prismaOTPRepository)
    const sendEmail = new SendEmail()
    const registerService = new RegisterService(prismaUserRepository, otpService, sendEmail)

    return {
      registerService,
    }
  }
}
