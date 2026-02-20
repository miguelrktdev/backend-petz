import type { User } from "~/generated/prisma/client.ts"
import type { UserCreateInput } from "~/generated/prisma/models.ts"

export interface IUserRepository {
  create(data: UserCreateInput): Promise<User>
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
