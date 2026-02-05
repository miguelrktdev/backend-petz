import type { User } from "@/generated/prisma/browser.ts"
import type { UserCreateInput } from "@/generated/prisma/models.ts"
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
}
