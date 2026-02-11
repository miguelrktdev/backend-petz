import type { User } from "@/generated/prisma/browser.ts"
import type { UserCreateInput, UserUpdateInput } from "@/generated/prisma/models.ts"
import { prisma } from "@/shared/lib/prisma.ts"
import type { UserRepository } from "./user.repository.ts"

export class PrismaUserRepository implements UserRepository {
  async create(data: UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
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
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
  async update(id: string, data: UserUpdateInput): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    })
    return updatedUser
  }
}
