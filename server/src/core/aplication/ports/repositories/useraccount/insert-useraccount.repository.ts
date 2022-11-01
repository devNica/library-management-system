import { InsertUserAccountDTO, RegisteredAccount } from '@core/domain/models/useraccount'

export interface InsertUserAccountRepository {
  insertUser: (data: InsertUserAccountDTO) => Promise<RegisteredAccount>
}
