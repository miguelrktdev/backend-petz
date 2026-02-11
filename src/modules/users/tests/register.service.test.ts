import type { User } from "@/generated/prisma/client.ts"
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists.error.ts"
import bcrypt from "bcryptjs"
import { RegisterService } from "../services/register.service.ts"

const MockedPrismaUserRepository = {
  create: vi.fn(),
  findByUsername: vi.fn(),
  findByEmail: vi.fn(),
}

const MockedCreateOTPService = {
  handle: vi.fn(),
}

const MockedSendEmail = {
  handle: vi.fn(),
}

describe("User Register Service", () => {
  let sut: RegisterService

  beforeEach(() => {
    vi.clearAllMocks()
    sut = new RegisterService(MockedPrismaUserRepository as any, MockedCreateOTPService as any, MockedSendEmail as any)
  })

  describe("Invalid Cases", () => {
    test("should not able to register with duplicated username", async () => {
      // Arrange
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password_123",
        bio: "My bio",
        profile_pic: null,
        profile_pic_id: null,
        email_verified_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(fakeUser)

      // Act & Assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          bio: "My bio",
          password: "SomePassword123@",
        })
      }).rejects.toBeInstanceOf(UserAlreadyExistsError)
      expect(vi.mocked(bcrypt.hash)).not.toHaveBeenCalled()
      expect(MockedPrismaUserRepository.create).not.toHaveBeenCalled()
      expect(MockedCreateOTPService.handle).not.toHaveBeenCalled()
      expect(MockedSendEmail.handle).not.toHaveBeenCalled()
    })
    test("should not be able to register with duplicated email", async () => {
      // Arrange
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password_123",
        bio: "My bio",
        profile_pic: null,
        profile_pic_id: null,
        email_verified_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      MockedPrismaUserRepository.findByEmail.mockResolvedValue(fakeUser)
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(null)

      // Act & Assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          bio: "My bio",
          password: "SomePassword123@",
        })
      }).rejects.toBeInstanceOf(UserAlreadyExistsError)
      expect(vi.mocked(bcrypt.hash)).not.toHaveBeenCalled()
      expect(MockedPrismaUserRepository.create).not.toHaveBeenCalled()
      expect(MockedCreateOTPService.handle).not.toHaveBeenCalled()
      expect(MockedSendEmail.handle).not.toHaveBeenCalled()
    })
  })

  describe("Edge Cases", () => {
    test("should not create OTP or send email if user creation fails", async () => {
      // Arrange
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(null)
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockImplementation(() => Promise.resolve("hashed_password_123"))
      MockedPrismaUserRepository.create.mockRejectedValue(new Error("DB Error"))

      expect(async () => {
        await sut.handle({
          name: "John",
          username: "john",
          email: "john@email.com",
          password: "123456",
          bio: "bio",
        })
      }).rejects.toThrow()
      expect(MockedCreateOTPService.handle).not.toHaveBeenCalled()
      expect(MockedSendEmail.handle).not.toHaveBeenCalled()
    })
    test("should not send email if OTP creation fails", async () => {
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockImplementation(() => Promise.resolve("hashed_password_123"))
      MockedPrismaUserRepository.create.mockResolvedValue({
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password_123",
        bio: "Bio",
      })
      MockedCreateOTPService.handle.mockRejectedValue(new Error("OTP Error"))

      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          password: "StrongPass123@",
          bio: "Bio",
        })
      }).rejects.toThrow()
      expect(MockedSendEmail.handle).not.toHaveBeenCalled()
    })
    test("should throw error if sending email fails", async () => {
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockImplementation(() => Promise.resolve("hashed_password_123"))
      MockedPrismaUserRepository.create.mockResolvedValue({
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password_123",
        bio: "Bio",
      })
      MockedCreateOTPService.handle.mockResolvedValue({
        otp: {
          token: "otp-123",
        },
      })
      MockedSendEmail.handle.mockRejectedValue(new Error("SMTP Error"))

      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          password: "StrongPass123@",
          bio: "Bio",
        })
      }).rejects.toThrow()
    })
  })

  describe("Happy Path", () => {
    test("should able to register the user", async () => {
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)
      MockedPrismaUserRepository.findByUsername.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockImplementation(() => Promise.resolve("hashed_password_123"))
      MockedPrismaUserRepository.create.mockResolvedValue({
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password_123",
        bio: "Bio",
      })
      MockedCreateOTPService.handle.mockResolvedValue({
        otp: {
          token: "otp-123",
        },
      })
      MockedSendEmail.handle.mockResolvedValue(undefined)

      const result = await sut.handle({
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password: "StrongPass123@",
        bio: "My Bio",
      })

      expect(result.user.id).toBe("123")
      expect(result.otp.token).toBe("otp-123")
      expect(MockedPrismaUserRepository.create).toHaveBeenCalled()
      expect(MockedCreateOTPService.handle).toHaveBeenCalled()
      expect(MockedSendEmail.handle).toHaveBeenCalled()
    })
  })
})
