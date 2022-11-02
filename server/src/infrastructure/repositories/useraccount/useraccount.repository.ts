import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FindByPkUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findbypk-useraccount.repository'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InserAdminAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-admin-account.repository'
import { FindByPkUserAccountDTO, FindOneUserAccountDTO, UserDTO, RegisteredUserModel, FoundUserAccountModel } from '@core/domain/models/useraccount'
import { UserAccountModel, UserGroupModel } from '@infrastructure/sequelize/models'
import { Op } from 'sequelize'

export class UserAccountRepository implements
    InserAdminAccountRepository,
    FindUserAccountByParameters,
    FindAllUserAccountByParameters,
    FindByPkUserAccountByParameters {
  async insertAdminUser (data: UserDTO): Promise<RegisteredUserModel> {
    const userDto = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      phoneNumber: data.phoneNumber,
      isRoot: data.isRoot,
      expiresIn: data.expiresIn,
      createdAt: data.createdAt
    }
    const user = await UserAccountModel.create(userDto)
    await UserGroupModel.create({
      fkUser: user.id,
      fkGroup: data.fkGroup,
      createdAt: data.createdAt
    })
    return { id: user.id, createdAt: user.createdAt }
  }

  async findUserAccount (data: FindOneUserAccountDTO): Promise<FoundUserAccountModel | null> {
    const user = await UserAccountModel.findOne({
      where: {
        [Op.or]: [
          { id: data.userId ?? '-' },
          { email: data.email ?? '-' },
          { fullname: data.fullname ?? '-' }
        ]
      }
    })

    return user
  }

  async findAllUserAccount (data: FindOneUserAccountDTO): Promise<FoundUserAccountModel[] | null> {
    const user = await UserAccountModel.findAll({
      where: {
        [Op.or]: [{ id: data.userId }, { email: data.email }, { fullname: data.fullname }]
      }
    })

    return user
  }

  async findByPkUserAccount (data: FindByPkUserAccountDTO): Promise<FoundUserAccountModel | null> {
    const user = await UserAccountModel.findByPk(data.userId)
    return user
  }
}
