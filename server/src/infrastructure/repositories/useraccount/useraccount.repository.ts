import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FindByPkUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findbypk-useraccount.repository'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InsertUserAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-useraccount.repository'
import { FindByPkUserAccountDTO, FindOneUserAccountDTO, InsertUserAccountDTO, UserAccountFound } from '@core/domain/models/useraccount'
import { UserAccountModel } from '@infrastructure/sequelize/models'
import { Op } from 'sequelize'

export class UserAccountRepository implements
    InsertUserAccountRepository,
    FindUserAccountByParameters,
    FindAllUserAccountByParameters,
    FindByPkUserAccountByParameters {
  async insertUser (data: InsertUserAccountDTO): Promise<void> {
    await UserAccountModel.create(data)
  }

  async findUserAccount (data: FindOneUserAccountDTO): Promise<UserAccountFound | null> {
    const user = await UserAccountModel.findOne({
      where: {
        [Op.or]: [{ id: data.userId }, { email: data.email }, { fullname: data.fullname }]
      }
    })

    return user
  }

  async findAllUserAccount (data: FindOneUserAccountDTO): Promise<UserAccountFound[] | null> {
    const user = await UserAccountModel.findAll({
      where: {
        [Op.or]: [{ id: data.userId }, { email: data.email }, { fullname: data.fullname }]
      }
    })

    return user
  }

  async findByPkUserAccount (data: FindByPkUserAccountDTO): Promise<UserAccountFound | null> {
    const user = await UserAccountModel.findByPk(data.userId)
    return user
  }
}
