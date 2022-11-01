import { FindByPkUserAccountDTO, UserAccountFound } from '@core/domain/models/useraccount'

export interface FindByPkUserAccountByParameters {
  findByPkUserAccount: (data: FindByPkUserAccountDTO) => Promise<UserAccountFound | null>
}
