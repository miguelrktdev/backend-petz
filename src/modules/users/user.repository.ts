import type { User } from "@/generated/prisma/browser.ts"
import type { UserCreateInput, UserUpdateInput } from "@/generated/prisma/models.ts"

export interface UserRepository {
	create(data: UserCreateInput): Promise<User>
	findByUsername(username: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	findById(id: string): Promise<User | null>
	update(id: string, data: UserUpdateInput): Promise<User>
}
