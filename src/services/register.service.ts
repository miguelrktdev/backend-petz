import bcrypt from "bcryptjs"
import type { User } from "~/generated/prisma/client.ts"
import type { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"

interface RegisterUserServiceRequest {
  name: string
  username: string
  email: string
  password: string
}
interface RegisterUserServiceResponse {
  user: User
}

export class RegisterUserService {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  async handle({ name, username, email, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const doesHaveUserWithSameUsername = await this.userRepository.findByUsername(username)
    const doesHaveUserWithSameEmail = await this.userRepository.findByEmail(email)

    if (doesHaveUserWithSameEmail || doesHaveUserWithSameUsername) {
      throw new Error("Usuário já cadastrado")
    }

    const password_hash = await bcrypt.hash(password, 6)

    const user = await this.userRepository.create({
      name,
      username,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
