import { FindOneUserAccountDTO, UserAccountFound } from '@core/domain/models/useraccount'

export interface FindUserAccountByParameters {
  findUserAccount: ({ userId, email, fullname }: FindOneUserAccountDTO) => Promise<UserAccountFound | null>
}
