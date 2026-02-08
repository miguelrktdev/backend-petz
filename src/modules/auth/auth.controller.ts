import { env } from "@/env.ts"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserNotVerifiedError } from "@/shared/errors/user-not-verified.error.ts"
import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { userAuthenticateSchema } from "./auth.schema.ts"
import { UserAuthenticateFactory } from "./factories/make-authenticate.factory.ts"

export const userAuthenticateController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = userAuthenticateSchema.safeParse(req.body)
		if (!success) {
			const issue = error.issues[0]
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: issue.message,
			})
		}
		const { userAuthenticateService } = new UserAuthenticateFactory().handle()
		const { token, refreshToken } = await userAuthenticateService.handle(data)
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
		})
		return res.status(StatusCodes.OK).json({
			token,
		})
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: error.message,
			})
		}
		if (error instanceof UserNotVerifiedError) {
			return res.status(StatusCodes.FORBIDDEN).json({
				message: error.message,
			})
		}
		if (error instanceof InvalidCredentialsError) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: error.message,
			})
		}
		next(error)
	}
}
