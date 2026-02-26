import bcrypt from "bcryptjs"
import { InvalidCredentialsError } from "~/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "~/errors/resource-not-found.error.ts"
import { PrismaUserRepositoryMock } from "~/mocks/prisma-user-mock.repository.ts"
import { AuthenticateUserService } from "~/services/authenticate.service.ts"

describe("Authenticate User Service", () => {
  let sut: AuthenticateUserService

  beforeEach(() => {
    vi.clearAllMocks()
    sut = new AuthenticateUserService(PrismaUserRepositoryMock)
  })

  describe("Invalid Cases", () => {
    test("should not return the user if they are not found", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@A",
        })
      }).rejects.toBeInstanceOf(ResourceNotFoundError)
      expect(vi.mocked(bcrypt.compare)).not.toHaveBeenCalled()
    })
    test("should not return the user if the provided passwords do not match", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue({
        id: "1",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      })
      vi.mocked(bcrypt.compare).mockImplementation(() => false)

      // act & assert
      expect(async () => {
        await sut.handle({
          email: "johndoe@email.com",
          password: "JohnDoe123@AAA",
        })
      }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
  })
  describe("Edge Cases", () => {
    test("should not return the user if the fields are blank", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          email: "",
          password: "",
        })
      }).rejects.toThrow()
      expect(vi.mocked(bcrypt.compare)).not.toHaveBeenCalled()
    })
    test("should not return the user if the fields are invalid", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          email: "someworng.com",
          password: "123",
        })
      }).rejects.toThrow()
      expect(vi.mocked(bcrypt.compare)).not.toHaveBeenCalled()
    })
  })
  describe("Happy Path", () => {
    test("should return the user if they found and the passwords are correct", async () => {
      // assert
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue({
        id: "1",
        name: "John Doe",
        username: "johndoe__",
        email: "johndoe@email.com",
        password_hash: "hashed_password",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      })
      vi.mocked(bcrypt.compare).mockImplementation(() => true)

      // act
      const result = await sut.handle({
        email: "johndoe@email.com",
        password: "JohnDoe123@A",
      })

      // arrange
      expect(result.user.id).toBeDefined()
      expect(result.user.name).toBe("John Doe")
      expect(result.user.username).toBe("johndoe__")
      expect(result.user.email).toBe("johndoe@email.com")
      expect(result.user.password_hash).toBe("hashed_password")
      expect(vi.mocked(bcrypt.compare)).toHaveBeenCalledWith("JohnDoe123@A", result.user.password_hash)
    })
  })
})
