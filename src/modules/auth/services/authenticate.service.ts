import type { PrismaUserRepository } from "@/modules/users/prisma-user.repository.ts"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserNotVerifiedError } from "@/shared/errors/user-not-verified.error.ts"
import type { GenerateJwtToken } from "@/shared/lib/generate-jwt-token.ts"
import bcrypt from "bcryptjs"

interface AuthenticateUserRequest {
	email: string
	password: string
}

interface AuthenticateUserResponse {
	token: string
	refreshToken: string
}

export class UserAuthenticateService {
	constructor(
		private userRepository: PrismaUserRepository,
		private generateJwtToken: GenerateJwtToken,
	) {}

	async handle({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new ResourceNotFoundError("Usuário")
		}

		if (!user.email_verified_at) {
			throw new UserNotVerifiedError()
		}

		const doesPasswordMatches = await bcrypt.compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		const { token } = this.generateJwtToken.handle({
			payload: {
				sub: user.id,
			},
			options: {
				expiresIn: "15m",
			},
		})

		const { token: refreshToken } = this.generateJwtToken.handle({
			payload: {
				sub: user.id,
			},
			options: {
				expiresIn: "7d",
			},
		})

		return {
			token,
			refreshToken,
		}
	}
}
