import { userRegisterSchema } from "@/modules/users/user.schema.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists.error.ts"
import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ProfileUserFactory } from "./factories/make-profile.factory.ts"
import { RegisterUserFactory } from "./factories/make-register.factory.ts"
import type { FastifyReply, FastifyRequest } from "fastify"

export const userRegisterController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, data, error } = userRegisterSchema.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        message: issue.message,
      })
    }
    const { registerService } = RegisterUserFactory.handle()
    await registerService.handle(data)
    reply.status(StatusCodes.CREATED).send({ message: "Por favor, verifique seu e-mail para confirmar o cadastro." })
  } catch (error) {
    console.error(error)
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(StatusCodes.CONFLICT).send({ message: error.message })
    }
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({ message: error.message })
    }
  }
}

export const userProfileController = async (request: Request, reply: Response, next: NextFunction) => {
  try {
    const userId = "1"
    const { profileService } = new ProfileUserFactory().handle()
    const { user } = await profileService.handle({
      userId,
    })
    return reply.status(StatusCodes.OK).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        message: error.message,
      })
    }
    next(error)
  }
}
