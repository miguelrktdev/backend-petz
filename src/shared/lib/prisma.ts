import { env } from "@/env.ts"
import { PrismaClient } from "@/generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = env.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })
