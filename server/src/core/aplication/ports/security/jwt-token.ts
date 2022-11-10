import { SignedToken } from '@core/domain/models/token'

export type supportedProdfileTypes = 'admin' | 'root' | 'refresh' | 'user'

export interface payloadToken {
  userId: string
  email: string
  profile: supportedProdfileTypes
}

export interface JWTToken {
  signedAccessToken: (payload: payloadToken) => SignedToken
  verifyAdminToken: (token: string) => string
}
