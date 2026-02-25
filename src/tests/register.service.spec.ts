import bcrypt from "bcryptjs"
import { UserAlreadyExistsError } from "~/errors/user-already-exists.error.ts"
import { PrismaUserRepositoryMock } from "~/mocks/prisma-user-mock.repository.ts"
import { RegisterUserService } from "~/services/register.service.ts"

describe("Register User Service", () => {
  let sut: RegisterUserService

  beforeEach(() => {
    sut = new RegisterUserService(PrismaUserRepositoryMock)
    vi.clearAllMocks()
  })

  describe("Invalid Cases", () => {
    test("should not register the user if exists a user with same email address", async () => {
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
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          password: "JohnDoe123@A",
        })
      }).rejects.toBeInstanceOf(UserAlreadyExistsError)
      expect(vi.mocked(bcrypt.hash)).not.toHaveBeenCalled()
      expect(PrismaUserRepositoryMock.create).not.toHaveBeenCalled()
    })
    test("should not register the user if exists a user with same username", async () => {
      // arrange
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue({
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
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          password: "JohnDoe123@A",
        })
      }).rejects.toBeInstanceOf(UserAlreadyExistsError)
      expect(vi.mocked(bcrypt.hash)).not.toHaveBeenCalled()
      expect(PrismaUserRepositoryMock.create).not.toHaveBeenCalled()
    })
  })
  describe("Edge Cases", () => {
    test("should not register the user if they password is not hashed", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockRejectedValue(new Error("BcryptJS Failed"))

      // act & assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe@email.com",
          password: "JohnDoe123@A",
        })
      }).rejects.toThrow()
    })
    test("should not create the user if the fields are blank", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue(null)

      // act & assert
      await expect(async () => {
        await sut.handle({
          name: "",
          username: "",
          email: "",
          password: "",
        })
      }).rejects.toThrow()
    })
    test("should return an error if the fields are invalid", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue(null)

      // act & assert
      expect(async () => {
        await sut.handle({
          name: "John Doe",
          username: "johndoe__",
          email: "johndoe.com",
          password: "johndoe1",
        })
      }).rejects.toThrow()
    })
  })
  describe("Happy Path", () => {
    test("should create the user", async () => {
      // arrange
      PrismaUserRepositoryMock.findByEmail.mockResolvedValue(null)
      PrismaUserRepositoryMock.findByUsername.mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockImplementation(() => Promise.resolve("hashed_password_123"))
      PrismaUserRepositoryMock.create.mockResolvedValue({
        id: "1",
        name: "John Doe",
        username: "johndoe2__",
        email: "johndoe2@email.com",
        password_hash: "hashed_password_123",
        bio: null,
        profile_pic: null,
        profile_pic_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      })

      // act
      const result = await sut.handle({
        name: "John Doe",
        username: "johndoe2__",
        email: "johndoe2@email.com",
        password: "JohnDoe123@A",
      })

      // assert
      expect(result.user).toHaveProperty("id")
      expect(result.user.email).toBe("johndoe2@email.com")
      expect(result.user.username).toBe("johndoe2__")
      expect(result.user.name).toBe("John Doe")
      expect(result.user.password_hash).toBe("hashed_password_123")
      expect(vi.mocked(bcrypt.hash)).toHaveBeenCalled()
      expect(PrismaUserRepositoryMock.create).toHaveBeenCalled()
    })
  })
})
