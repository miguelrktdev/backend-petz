import type { OTP } from "@/generated/prisma/client.ts"
import type { OTPCreateInput } from "@/generated/prisma/models.ts"

export interface OTPRepository {
  create(data: OTPCreateInput): Promise<OTP>
  findByCode(code: string): Promise<OTP | null>
  delete(id: string): Promise<void>
}
