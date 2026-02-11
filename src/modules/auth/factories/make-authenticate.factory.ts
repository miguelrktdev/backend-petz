import { PrismaUserRepository } from "@/modules/users/prisma-user.repository.ts"
import { GenerateJwtToken } from "@/shared/lib/generate-jwt-token.ts"
import { UserAuthenticateService } from "../services/authenticate.service.ts"

export class UserAuthenticateFactory {
  handle() {
    const userRepository = new PrismaUserRepository()
    const generateJwtToken = new GenerateJwtToken()
    const userAuthenticateService = new UserAuthenticateService(userRepository, generateJwtToken)

    return {
      userAuthenticateService,
    }
  }
}
