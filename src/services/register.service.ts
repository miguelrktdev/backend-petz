import bcrypt from "bcryptjs"
import crypto from "crypto"
import dayjs from "dayjs"
import { redisConnection } from "~/config/redis-connection.ts"
import type { User } from "~/generated/prisma/client.ts"
import { generateOtpEmailTemplate } from "~/mails/otp-verification-email-template.ts"
import { mailQueue } from "~/queues/mail-queues.ts"
import type { PrismaOTPRepository } from "~/repositories/prisma-otp.service.ts"
import type { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"

interface RegisterUserServiceRequest {
  name: string
  username: string
  email: string
  password: string
}
interface RegisterUserServiceResponse {
  user: User
}

export class RegisterUserService {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly otpRepository: PrismaOTPRepository,
  ) {}

  async handle({ name, username, email, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const doesHaveUserWithSameUsername = await this.userRepository.findByUsername(username)
    const doesHaveUserWithSameEmail = await this.userRepository.findByEmail(email)

    if (doesHaveUserWithSameEmail || doesHaveUserWithSameUsername) {
      throw new Error("Usuário já cadastrado")
    }

    const password_hash = await bcrypt.hash(password, 6)

    const user = await this.userRepository.create({
      name,
      username,
      email,
      password_hash,
    })
    const code = crypto.randomInt(100000, 999999).toString()
    const otp = await this.otpRepository.create({
      code,
      expires_at: dayjs().add(15, "minutes").toDate(),
      user: {
        connect: {
          id: user.id,
        },
      },
    })

    const { text, subject, html } = generateOtpEmailTemplate({
      userName: user.username,
      otpCode: otp.code,
    })

    await redisConnection.set(`otp:${user.email}`, otp.code, "EX", 900)

    // TODO: Enviar o otp por email para o usuário usando filas
    await mailQueue.add("email-queue", {
      to: user.email,
      subject,
      text,
      html,
    })

    return {
      user,
    }
  }
}
