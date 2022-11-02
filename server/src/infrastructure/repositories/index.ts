import { UserAccountRepository } from '@infrastructure/repositories/useraccount/useraccount.repository'
import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FindByPkUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findbypk-useraccount.repository'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InsertUserAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-useraccount.repository'

const authRepository = new UserAccountRepository()

const findUserAccount: FindUserAccountByParameters = authRepository
const findAllUserAccount: FindAllUserAccountByParameters = authRepository
const findByPkUserAccount: FindByPkUserAccountByParameters = authRepository
const insertUser: InsertUserAccountRepository = authRepository

export {
  insertUser,
  findUserAccount,
  findAllUserAccount,
  findByPkUserAccount
}
