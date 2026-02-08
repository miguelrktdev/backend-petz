import { OTPInvalidOrExpiredError } from "@/shared/errors/otp-invalid-or-expired.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { OTPVerifyService } from "../services/verify.service.ts"

const MockedUserRepository = {
	findById: vi.fn(),
	update: vi.fn(),
}

const MockedOTPRepository = {
	findByCode: vi.fn(),
	delete: vi.fn(),
}

describe("Verification OTP Service", () => {
	let sut: OTPVerifyService

	beforeEach(() => {
		vi.clearAllMocks()

		sut = new OTPVerifyService(MockedOTPRepository as any, MockedUserRepository as any)
	})

	describe("Invalid Cases", () => {
		test("should not be able to verify an invalid OTP code", async () => {
			MockedOTPRepository.findByCode.mockResolvedValue(null)

			await expect(async () => {
				await sut.handle({ code: "invalid_code" })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an expired OTP code", async () => {
			MockedOTPRepository.findByCode.mockResolvedValue({
				id: "otp_id",
				user_id: "user_id",
				code: "valid_code",
				expires_at: new Date(Date.now() - 1000), // Expired 1 second ago
				revoked_at: null,
			})

			await expect(async () => {
				await sut.handle({ code: "valid_code" })
			}).rejects.toBeInstanceOf(OTPInvalidOrExpiredError)
		})

		test("should not be able to verify a revoked OTP code", async () => {
			MockedOTPRepository.findByCode.mockResolvedValue({
				id: "otp_id",
				user_id: "user_id",
				code: "valid_code",
				expires_at: new Date(Date.now() + 1000), // Not expired
				revoked_at: new Date(), // Revoked now
			})

			await expect(async () => {
				await sut.handle({ code: "valid_code" })
			}).rejects.toBeInstanceOf(OTPInvalidOrExpiredError)
		})

		test("should not be able to verify a user that does not exist", async () => {
			MockedOTPRepository.findByCode.mockResolvedValue({
				id: "otp_id",
				user_id: "user_id",
				code: "valid_code",
				expires_at: new Date(Date.now() + 1000), // Not expired
				revoked_at: null,
			})

			MockedUserRepository.findById.mockResolvedValue(null)

			await expect(async () => {
				await sut.handle({ code: "valid_code" })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})
	})
	describe("Edge Cases", () => {
		test("should not be able to verify an OTP with an empty code", async () => {
			await expect(async () => {
				await sut.handle({ code: "" })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with a null code", async () => {
			await expect(async () => {
				await sut.handle({ code: null as any })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with an undefined code", async () => {
			await expect(async () => {
				await sut.handle({ code: undefined as any })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with a whitespace-only code", async () => {
			await expect(async () => {
				await sut.handle({ code: "   " })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with a code that is too long", async () => {
			await expect(async () => {
				await sut.handle({ code: "a".repeat(101) })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with a code that is too short", async () => {
			await expect(async () => {
				await sut.handle({ code: "123" })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		test("should not be able to verify an OTP with a code that is not alphanumeric", async () => {
			await expect(async () => {
				await sut.handle({ code: "123abc!" })
			}).rejects.toBeInstanceOf(ResourceNotFoundError)
		})
	})
	describe("Happy Path", () => {
		test("should be able to verify a valid OTP code", async () => {
			MockedOTPRepository.findByCode.mockResolvedValue({
				id: "otp_id",
				user_id: "user_id",
				code: "valid_code",
				expires_at: new Date(Date.now() + 1000), // Not expired
				revoked_at: null,
			})
			MockedUserRepository.findById.mockResolvedValue({
				id: "user_id",
				email: "test@example.com",
			})
			const result = await sut.handle({ code: "valid_code" })

			expect(result).toBeUndefined()
			expect(MockedUserRepository.update).toHaveBeenCalledWith("user_id", {
				email_verified_at: expect.any(Date),
			})
			expect(MockedOTPRepository.delete).toHaveBeenCalledWith("otp_id")
		})
	})
})
