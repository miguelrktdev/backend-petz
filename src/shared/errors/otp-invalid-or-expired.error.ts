export class OTPInvalidOrExpiredError extends Error {
	constructor() {
		super("Código OTP inválido ou expirado!")
	}
}
