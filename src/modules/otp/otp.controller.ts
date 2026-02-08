import { OTPInvalidOrExpiredError } from "@/shared/errors/otp-invalid-or-expired.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { OTPVerifyFactory } from "./factories/make-verify.factory.ts"
import { OTPVerifySchema } from "./otp.schema.ts"

export const OTPVerifyController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { success, data, error } = OTPVerifySchema.safeParse(req.body)
		if (!success) {
			const issue = error.issues[0]
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: issue.message,
			})
		}
		const { otpVerifyService } = new OTPVerifyFactory().handle()
		await otpVerifyService.handle(data)
        return res.status(StatusCodes.OK).json({
            message: "Usuário verificado com sucesso",
        })
	} catch (error) {
		if (error instanceof OTPInvalidOrExpiredError) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: error.message,
			})
		}
		if (error instanceof ResourceNotFoundError) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: error.message,
			})
		}
		next(error)
	}
}
