import { env } from "@/env.ts"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserNotVerifiedError } from "@/shared/errors/user-not-verified.error.ts"
import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { userAuthenticateSchema } from "./auth.schema.ts"
import { UserAuthenticateFactory } from "./factories/make-authenticate.factory.ts"

export const userAuthenticateController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, data, error } = userAuthenticateSchema.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: issue.message,
      })
    }
    const { userAuthenticateService } = new UserAuthenticateFactory().handle()
    const { user } = await userAuthenticateService.handle(data)
    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: env.NODE_ENV === "production" ? true : false,
    })
    return reply.status(StatusCodes.OK).send({
      accessToken,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message,
      })
    }
    if (error instanceof UserNotVerifiedError) {
      return reply.status(StatusCodes.FORBIDDEN).send({
        message: error.message,
      })
    }
    if (error instanceof InvalidCredentialsError) {
      return reply.status(StatusCodes.UNAUTHORIZED).send({
        message: error.message,
      })
    }
  }
}
