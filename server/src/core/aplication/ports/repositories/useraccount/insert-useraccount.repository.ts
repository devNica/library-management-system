import { InsertUserAccountDTO } from '@core/domain/models/useraccount'

export interface InsertUserAccountRepository {
  insertUser: (data: InsertUserAccountDTO) => Promise<void>
}
