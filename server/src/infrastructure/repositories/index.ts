import { UserAccountRepository } from '@infrastructure/repositories/useraccount/useraccount.repository'
import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FindByPkUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findbypk-useraccount.repository'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InserAdminAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-admin-account.repository'

const authRepository = new UserAccountRepository()

const findUserAccount: FindUserAccountByParameters = authRepository
const findAllUserAccount: FindAllUserAccountByParameters = authRepository
const findByPkUserAccount: FindByPkUserAccountByParameters = authRepository
const insertAdminUser: InserAdminAccountRepository = authRepository

export {
  insertAdminUser,
  findUserAccount,
  findAllUserAccount,
  findByPkUserAccount
}
