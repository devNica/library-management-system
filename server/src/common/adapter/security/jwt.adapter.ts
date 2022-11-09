import constants from '@common/config/constants'
import { JWTToken } from '@core/aplication/ports/security/jwt-token'
import { SignedToken } from '@core/domain/models/token'
import jwt from 'jsonwebtoken'

export class JWTTokenSecurity implements JWTToken {
  constructor (
    private readonly secret: string,
    private readonly secretTokenExpiration: string
    // private readonly refreshTokenExpiration: number
  ) {}

  signedAccessToken (userId: string): SignedToken {
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.secretTokenExpiration
    })

    return { token }
  }

  verify (token: string, isAccessToken: boolean): string {
    const secret = isAccessToken ? this.secret : '-'
    const userData = jwt.verify(token, secret) as { id: string }
    return userData.id
  }
}

const secret = constants.SECRET_TOKEN.admin
// const refresh = constants.SECRET_TOKEN.refresh
const secretTokenExp = constants.SECRET_TOKEN_EXP
// const refreshTokenExp = constants.REFRESH_TOKEN_EXP

export const jwtTokenSecurity = new JWTTokenSecurity(
  secret,
  secretTokenExp
)
