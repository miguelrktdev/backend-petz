import type { User } from "@/generated/prisma/client.ts"
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found.error.ts"
import { ProfileService } from "../services/profile.service.ts"

const MockedPrismaUserRepository = {
  findById: vi.fn(),
}

describe("Profile Service", () => {
  let sut: ProfileService

  beforeEach(() => {
    vi.clearAllMocks()
    sut = new ProfileService(MockedPrismaUserRepository as any)
  })

  describe("invalid Cases", () => {
    test("should not return the user if they not found", async () => {
      MockedPrismaUserRepository.findById.mockResolvedValue(null)

      expect(async () => {
        await sut.handle({
          userId: "123",
        })
      }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
  })

  describe("Edge Cases", () => {
    test("should not return the user if userId is blank", async () => {
      MockedPrismaUserRepository.findById.mockResolvedValue(null)

      expect(async () => {
        await sut.handle({
          userId: "",
        })
      }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
  })

  describe("Happy path", () => {
    test("should return the user if they exists", async () => {
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
      MockedPrismaUserRepository.findById.mockResolvedValue(fakeUser)

      const result = await sut.handle({
        userId: "123",
      })

      expect(result.user.id).toBeDefined()
      expect(result.user.username).toBe("johndoe__")
      expect(MockedPrismaUserRepository.findById).toHaveBeenCalled()
      expect(MockedPrismaUserRepository.findById).toHaveBeenCalledWith("123")
    })
  })
})
