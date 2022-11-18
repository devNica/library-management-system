import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FoundUserAccountModel, GetListUserAccountsResponseModel } from '@core/domain/models/useraccount'
import { GetListUserAccountsUseCase } from '@core/domain/usecase/useraccount.usecase'

export class GetListUserAccounts implements GetListUserAccountsUseCase {
  constructor (
    private readonly get: FindAllUserAccountByParameters
  ) {}

  async execute (): Promise<GetListUserAccountsResponseModel[]> | never {
    try {
      const response = await this.fetchListUserAccount()
      return response.map(e => {
        return {
          userId: e.id,
          fullname: e.fullname,
          email: e.email,
          profile: e.profileName ?? 'user',
          createdAt: new Date(e.createdAt),
          isActive: e.isActive
        }
      })
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Error: ${error.message}`)
    }
  }

  async fetchListUserAccount (): Promise<FoundUserAccountModel[]> {
    return await this.get.findAllUserAccount({})
  }
}
