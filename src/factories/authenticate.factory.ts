import { PrismaUserRepository } from "~/repositories/prisma-user.repository.ts"
import { AuthenticateUserService } from "~/services/authenticate.service.ts"

export const UserAuthenticateFactory = () => {
  const userRepository = new PrismaUserRepository()
  const authenticateUserService = new AuthenticateUserService(userRepository)
  return {
    authenticateUserService,
  }
}
