import { SignedToken } from '@core/domain/models/token'

export interface JWTToken {
  signedAccessToken: (userId: string) => SignedToken
  verify: (token: string, isAccessToken: boolean) => string
}
