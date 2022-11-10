// import { RedisAdapter } from '@common/adapter/cache/redis.adapter'
import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { JWTTokenSecurity } from '@common/adapter/security/jwt.adapter'
import { currentDateIsGreater } from '@common/helper/date.helper'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { payloadToken } from '@core/aplication/ports/security/jwt-token'
import { FoundUserAccountModel, SigninRequestModel, SigninResponseModel } from '@core/domain/models/useraccount'
import { SigninUseCase } from '@core/domain/usecase/useraccount.usecase'

export class SigninAdmin implements SigninUseCase {
  constructor (
    private readonly get: FindUserAccountByParameters,
    private readonly security: ArgonSecurityAdapter,
    private readonly token: JWTTokenSecurity
    // private readonly cache: RedisAdapter
  ) {}

  async execute (requets: SigninRequestModel): Promise<SigninResponseModel> | never {
    try {
      const userFromRepo = await this.verifyAccount(requets.email, requets.password)

      await this.validatePasswordExpiration(userFromRepo.expiresIn)
      const token = await this.generateToken({
        userId: userFromRepo.id,
        email: userFromRepo.email,
        profile: userFromRepo.profileName ?? 'user'
      })

      const user = {
        userId: userFromRepo.id,
        email: userFromRepo.email,
        fullname: userFromRepo.fullname,
        resetPassword: true,
        phoneNumber: userFromRepo.phoneNumber,
        isActive: true,
        profile: userFromRepo.profileName ?? '-'
      }
      return { user, token }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Error: ${error.message}`)
    }
  }

  async verifyAccount (email: string, password: string): Promise<FoundUserAccountModel> {
    const user = await this.get.findUserAccount({ email })
    if (user === null) throw new Error('User account not found')
    if (!user.isActive) throw new Error('The user account is disabled')
    if (user.profileName !== 'admin' && !user.isRoot) throw new Error('the users account does not have administrator permissions')
    if (!await this.security.compare(password, user.password)) throw new Error('User account credentials failed')
    return user
  }

  async validatePasswordExpiration (expiresIn: number): Promise<void> {
    if (!currentDateIsGreater(new Date(expiresIn))) throw new Error('Password has expired')
  }

  async generateToken (payload: payloadToken): Promise<string> {
    return this.token.signedAccessToken(payload).token
  }
}
