import { userRegisterSchema } from "@/modules/users/user.schema.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists.error.ts"
import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { RegisterUserFactory } from "./factories/register.factory.ts"

export const userRegisterController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = userRegisterSchema.safeParse(req.body)
		if (!success) {
			const issue = error.issues[0]
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: issue.message,
			})
		}
		const { registerService } = RegisterUserFactory.handle()
		await registerService.handle(data)
		res.status(StatusCodes.CREATED).json({ message: "Por favor, verifique seu e-mail para confirmar o cadastro." })
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return res.status(StatusCodes.CONFLICT).json({ message: error.message })
		}
		if (error instanceof ResourceNotFoundError) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
		}
		next(error)
	}
}
