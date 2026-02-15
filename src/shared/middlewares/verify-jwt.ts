/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    request.jwtVerify()
  } catch (error) {
    reply.status(StatusCodes.UNAUTHORIZED).send({
      message: "Sem autorização",
    })
  }
}
