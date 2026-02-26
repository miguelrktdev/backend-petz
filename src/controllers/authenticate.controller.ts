import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { InvalidCredentialsError } from "~/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "~/errors/resource-not-found.error.ts"
import { UserAlreadyExistsError } from "~/errors/user-already-exists.error.ts"
import { UserAuthenticateFactory } from "~/factories/authenticate.factory.ts"
import { userValidators } from "~/validators/user.validators.ts"

export const authenticateUserController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, error, data } = userValidators.login.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: issue.message,
      })
    }
    const { email, password } = data
    const { authenticateUserService } = UserAuthenticateFactory()
    const { user } = await authenticateUserService.handle({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {},
      {
        sub: user.id,
      },
    )
    return reply.status(StatusCodes.OK).send({
      success: true,
      token,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      })
    }
    if (error instanceof InvalidCredentialsError) {
      return reply.status(StatusCodes.BAD_REQUEST).send({
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
