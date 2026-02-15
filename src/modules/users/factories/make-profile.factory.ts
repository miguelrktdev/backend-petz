import { PrismaUserRepository } from "../prisma-user.repository.ts"
import { ProfileService } from "../services/profile.service.ts"

export class ProfileUserFactory {
  handle() {
    const userRepository = new PrismaUserRepository()
    const profileService = new ProfileService(userRepository)
    return {
      profileService,
    }
  }
}
