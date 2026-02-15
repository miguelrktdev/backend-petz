/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@/generated/prisma/client.ts"
import { InvalidCredentialsError } from "@/shared/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { UserNotVerifiedError } from "@/shared/errors/user-not-verified.error.ts"
import bcrypt from "bcryptjs"
import { UserAuthenticateService } from "../services/authenticate.service.ts"

const MockedPrismaUserRepository = {
  create: vi.fn(),
  findByUsername: vi.fn(),
  findByEmail: vi.fn(),
}

const MockedGenerateJwtToken = {
  handle: vi.fn(),
}

describe("User Authenticate Service", () => {
  let sut: UserAuthenticateService

  beforeEach(() => {
    vi.clearAllMocks()

    sut = new UserAuthenticateService(MockedPrismaUserRepository as any, MockedGenerateJwtToken as any)
  })

  describe("Invalid Cases", () => {
    test("should not be able to authenticate if the user cannot be found", async () => {
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(null)

      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@",
        })
      }).rejects.toBeInstanceOf(ResourceNotFoundError)
      expect(MockedGenerateJwtToken.handle).not.toHaveBeenCalled()
    })

    test("should not be able to authenticate if the user is not verified", async () => {
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        email_verified_at: null,
      }
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(fakeUser)

      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@",
        })
      }).rejects.toBeInstanceOf(UserNotVerifiedError)
      expect(MockedGenerateJwtToken.handle).not.toHaveBeenCalled()
    })

    test("should not be able to authenticate if the wrong password is provided", async () => {
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        email_verified_at: new Date(),
      }
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(fakeUser)
      vi.mocked(bcrypt.compare).mockImplementation(() => Promise.resolve(false))

      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@",
        })
      }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
  })

  describe("Egde Cases", () => {
    test("should not be able to authenticate if the JWT Token is not generated", async () => {
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        email_verified_at: new Date(),
      }
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(fakeUser)
      vi.mocked(bcrypt.compare).mockImplementation(() => Promise.resolve(true))
      MockedGenerateJwtToken.handle.mockImplementation(() => {
        throw new Error("Failed to generate JWT token")
      })

      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@",
        })
      }).rejects.toThrow("Failed to generate JWT token")
    })
  })

  describe("Happy Path", () => {
    test("should able to authenticate the user", async () => {
      const fakeUser: User = {
        id: "123",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        email_verified_at: new Date(),
      }
      MockedPrismaUserRepository.findByEmail.mockResolvedValue(fakeUser)
      vi.mocked(bcrypt.compare).mockImplementation(() => Promise.resolve(true))
      MockedGenerateJwtToken.handle.mockReturnValue({
        token: "token123",
      })

      const result = await sut.handle({
        email: "johndoe@email.com",
        password: "JohnDoe123@",
      })

      expect(result).toEqual({
        accessToken: "token123",
        refreshToken: "token123",
      })
      expect(MockedPrismaUserRepository.findByEmail).toHaveBeenCalledWith("johndoe@email.com")
      expect(bcrypt.compare).toHaveBeenCalledWith("JohnDoe123@", "hashed_password")
      expect(MockedGenerateJwtToken.handle).toHaveBeenCalledTimes(2)
    })
  })
})
