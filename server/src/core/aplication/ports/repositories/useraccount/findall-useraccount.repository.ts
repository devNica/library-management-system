import { FindOneUserAccountDTO, UserAccountFound } from '@core/domain/models/useraccount'

export interface FindAllUserAccountByParameters {
  findAllUserAccount: (data: FindOneUserAccountDTO) => Promise<UserAccountFound[] | null>
}
