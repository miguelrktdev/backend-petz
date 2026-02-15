import { OTPInvalidOrExpiredError } from "@/shared/errors/otp-invalid-or-expired.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { StatusCodes } from "http-status-codes"
import { OTPVerifyFactory } from "./factories/make-verify.factory.ts"
import { OTPVerifySchema } from "./otp.schema.ts"
import type { FastifyReply, FastifyRequest } from "fastify"

export const OTPVerifyController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, data, error } = OTPVerifySchema.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: issue.message,
      })
    }
    const { otpVerifyService } = new OTPVerifyFactory().handle()
    await otpVerifyService.handle(data)
    return reply.status(StatusCodes.OK).send({
      message: "Usuário verificado com sucesso",
    })
  } catch (error) {
    if (error instanceof OTPInvalidOrExpiredError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: error.message,
      })
    }
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message,
      })
    }
  }
}
