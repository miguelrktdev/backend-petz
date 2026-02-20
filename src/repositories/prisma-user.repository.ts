import type { User } from "~/generated/prisma/client.ts"
import type { UserCreateInput } from "~/generated/prisma/models.ts"
import type { IUserRepository } from "./IUserRepository.ts"
import { prisma } from "~/lib/prisma.ts"

export class PrismaUserRepository implements IUserRepository {
  async create(data: UserCreateInput): Promise<User> {
    const user = prisma.user.create({
      data,
    })
    return user
  }
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
