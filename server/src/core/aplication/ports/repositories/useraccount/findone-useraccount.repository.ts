import { FindOneUserAccountDTO, FoundUserAccountModel } from '@core/domain/models/useraccount'

export interface FindUserAccountByParameters {
  findUserAccount: ({ userId, email, fullname }: FindOneUserAccountDTO) => Promise<FoundUserAccountModel | null>
}
