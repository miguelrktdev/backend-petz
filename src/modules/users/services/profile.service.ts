import type { User } from "@/generated/prisma/client.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import type { PrismaUserRepository } from "../prisma-user.repository.ts"

interface ProfileServiceRequest {
  userId: string
}

interface ProfileServiceResponse {
  user: User
}

export class ProfileService {
  constructor(private userRepository: PrismaUserRepository) {}

  async handle({ userId }: ProfileServiceRequest): Promise<ProfileServiceResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError("Usuário")
    }

    return {
      user,
    }
  }
}
