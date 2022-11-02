import { UserDTO, RegisteredUserModel } from '@core/domain/models/useraccount'

export interface InserAdminAccountRepository {
  insertAdminUser: (data: UserDTO) => Promise<RegisteredUserModel>
}
