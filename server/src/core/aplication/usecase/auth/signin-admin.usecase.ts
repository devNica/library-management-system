import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { FoundUserAccountModel, SigninRequestModel, SigninResponseModel } from '@core/domain/models/useraccount'
import { SigninUseCase } from '@core/domain/usecase/useraccount.usecase'

export class SigninAdmin implements SigninUseCase {
  constructor (
    private readonly get: FindUserAccountByParameters
  ) {}

  async execute (requets: SigninRequestModel): Promise<SigninResponseModel> | never {
    try {
      const userFromRepo = await this.verifyAccount(requets.email)

      if (userFromRepo !== null) {
        const user = {
          userId: userFromRepo.id,
          email: userFromRepo.email,
          fullname: userFromRepo.fullname,
          resetPassword: true,
          phoneNumber: userFromRepo.phoneNumber,
          isActive: true,
          profile: userFromRepo.profileName ?? '-'
        }
        return { user, token: 'dfsjdksdksfodpf' }
      } else throw new Error('User account not found')
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`An error ocurred: ${error.message}`)
    }
  }

  async verifyAccount (email: string): Promise<FoundUserAccountModel | null> {
    const user = await this.get.findUserAccount({ email })
    if (user === null) throw new Error('User account not found')
    return user
  }
}
