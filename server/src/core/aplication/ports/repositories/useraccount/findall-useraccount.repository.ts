import { FindOneUserAccountDTO, FoundUserAccountModel } from '@core/domain/models/useraccount'

export interface FindAllUserAccountByParameters {
  findAllUserAccount: (data: FindOneUserAccountDTO) => Promise<FoundUserAccountModel[]> | never
}
