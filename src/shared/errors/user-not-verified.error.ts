export class UserNotVerifiedError extends Error {
  constructor() {
    super("Usuário não verificado")
  }
}
