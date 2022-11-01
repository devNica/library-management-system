import { FindOneUserAccountDTO, UserAccountFound } from '@core/domain/models/useraccount'

export interface FindUserAccountByParameters {
  findUserAccount: (data: FindOneUserAccountDTO) => Promise<UserAccountFound | null>
}
