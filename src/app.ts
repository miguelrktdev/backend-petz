import { routes } from "@/routes.ts"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { type ErrorRequestHandler } from "express"
import helmet from "helmet"
import { StatusCodes } from "http-status-codes"
import { ZodError } from "zod"

export const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api", routes)
app.use((_req, res) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		message: "Rota não encontrada!",
	})
})
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof ZodError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: err.message,
		})
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: "Internal Server Error ❌",
	})
}
app.use(globalErrorHandler)
