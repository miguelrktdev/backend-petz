import { env } from "@/env.ts"
import JWT from "jsonwebtoken"

interface GenerateJwtTokenRequest {
  payload: string | object | Buffer<ArrayBufferLike>
  options?: JWT.SignOptions
}

interface GenerateJwtTokenResponse {
  token: string
}

export class GenerateJwtToken {
  handle({ payload, options }: GenerateJwtTokenRequest): GenerateJwtTokenResponse {
    const token = JWT.sign(payload, env.JWT_SECRET, options)
    return { token }
  }
}
