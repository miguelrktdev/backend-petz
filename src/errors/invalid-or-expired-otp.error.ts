export class InvalidOrExpiredOTPError extends Error {
  constructor() {
    super("OTP Expirado ou inválido")
  }
}
