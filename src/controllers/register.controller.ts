import crypto from "crypto"
import dayjs from "dayjs"
import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { redisConnection } from "~/config/redis-connection.ts"
import { UserAlreadyExistsError } from "~/errors/user-already-exists.error.ts"
import { UserRegisterFactory } from "~/factories/register.factory.ts"
import { generateOtpEmailTemplate } from "~/mails/otp-verification-email-template.ts"
import { mailQueue } from "~/queues/mail-queues.ts"
import { PrismaOTPRepository } from "~/repositories/prisma-otp.service.ts"
import { userValidators } from "~/validators/user.validators.ts"

export const registerUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, error, data } = userValidators.register.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: issue.message,
      })
    }
    const { name, username, email, password } = data
    const { registerUserService } = new UserRegisterFactory().handle()
    const { user } = await registerUserService.handle({
      name,
      username,
      email,
      password,
    })
    const otpRepository = new PrismaOTPRepository()
    const code = crypto.randomInt(100000, 999999).toString()
    const otp = await otpRepository.create({
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
    return reply.status(StatusCodes.CREATED).send({
      success: true,
      message: "Por favor verifique seu e-mail para confirmar seu cadastro",
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(StatusCodes.CONFLICT).send({
        success: false,
        message: error.message,
      })
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error,
    })
  }
}
