import { SignedToken } from '@core/domain/models/token'

export type supportedProdfileTypes = 'admin' | 'root' | 'refresh' | 'user'

export interface payloadToken {
  userId: string
  email: string
  profile: supportedProdfileTypes
}

export interface JWTToken {
  signedAccessToken: (payload: payloadToken, isMain?: boolean) => SignedToken
  verifyAdminToken: (token: string) => string
}
