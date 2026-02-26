import bcrypt from "bcryptjs"
import { InvalidCredentialsError } from "~/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "~/errors/resource-not-found.error.ts"
import type { User } from "~/generated/prisma/client.ts"
import type { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"

interface AuthenticateUserServiceRequest {
  email: string
  password: string
}
interface AuthenticateUserServiceResponse {
  user: User
}

export class AuthenticateUserService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async handle({ email, password }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError("Usuário")
    }

    const doesPasswordMatches = await bcrypt.compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
