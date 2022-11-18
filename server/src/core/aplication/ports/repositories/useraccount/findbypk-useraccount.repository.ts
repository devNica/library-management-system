import { FindByPkUserAccountDTO, FoundUserAccountModel } from '@core/domain/models/useraccount'

export interface FindByPkUserAccountByParameters {
  findByPkUserAccount: (data: FindByPkUserAccountDTO) => Promise<FoundUserAccountModel | null>
}
