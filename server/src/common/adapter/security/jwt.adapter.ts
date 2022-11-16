import constants from '@common/config/constants'
import { JWTToken, payloadToken } from '@core/aplication/ports/security/jwt-token'
import { SignedToken } from '@core/domain/models/token'
import jwt from 'jsonwebtoken'

interface keyTypes {
  admin: string
  root: string
  user: string
  refresh: string
}

export class JWTTokenSecurity implements JWTToken {
  constructor (
    private readonly secretKeys: keyTypes,
    private readonly secretTokenExpiration: string,
    private readonly refreshTokenExpiration: string
  ) {}

  signedAccessToken (payload: payloadToken, isMain: boolean = true): SignedToken {
    const secret = this.secretKeys[`${payload.profile}`]
    const expiration = isMain
      ? this.secretTokenExpiration
      : this.refreshTokenExpiration
    const token = jwt.sign(payload, secret, {
      expiresIn: expiration
    })

    return { token }
  }

  verifyAdminToken (token: string): string {
    const secret = this.secretKeys.admin
    const userData = jwt.verify(token, secret) as { id: string }
    return userData.id
  }
}

const secret = constants.SECRET_TOKEN
const secretTokenExp = constants.SECRET_TOKEN_EXP
const refreshTokenExp = constants.REFRESH_TOKEN_EXP

export const jwtTokenSecurity = new JWTTokenSecurity(
  secret,
  secretTokenExp,
  refreshTokenExp
)