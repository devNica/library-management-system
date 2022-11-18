import { FindAllUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findall-useraccount.repository'
import { FindByPkUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findbypk-useraccount.repository'
import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InserAdminAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-admin-account.repository'
import { FindByPkUserAccountDTO, FindOneUserAccountDTO, UserDTO, RegisteredUserModel, FoundUserAccountModel } from '@core/domain/models/useraccount'
import { UserAccountModel, UserProfileModel } from '@infrastructure/sequelize/models'
import db from '@infrastructure/sequelize/connection'
import { Op, QueryTypes } from 'sequelize'
import { fetchUserByParams } from './sql/queries'

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
    await UserProfileModel.create({
      fkUser: user.id,
      fkProfile: data.fkProfile,
      createdAt: data.createdAt
    })
    return { id: user.id, createdAt: user.createdAt }
  }

  async findUserAccount ({ userId, email, fullname }: FindOneUserAccountDTO): Promise<FoundUserAccountModel | null> {
    const rows: FoundUserAccountModel[] = await db.query(fetchUserByParams(), {
      replacements: {
        userId: userId ?? '-',
        email: email ?? '-',
        fullname: fullname ?? '-'
      },
      type: QueryTypes.SELECT
    })

    if (rows !== null && rows.length > 0) {
      return {
        id: rows[0].id,
        email: rows[0].email,
        password: rows[0].password,
        fullname: rows[0].fullname,
        phoneNumber: rows[0].phoneNumber,
        profileName: rows[0].profileName,
        resetPassword: rows[0].resetPassword,
        expiresIn: rows[0].expiresIn,
        isRoot: rows[0].isRoot,
        isActive: rows[0].isActive,
        createdAt: rows[0].createdAt
      }
    } else return null
  }

  async findAllUserAccount (data: FindOneUserAccountDTO): Promise<FoundUserAccountModel[]> {
    console.log('DATA: ', data)
    const user = await UserAccountModel.findAll({
      where: {
        [Op.or]:
          [
            { id: { [Op.like]: `%${data.userId ?? ''}%` } },
            { email: { [Op.like]: `%${data.email ?? ''}%` } },
            { fullname: { [Op.like]: `%${data.fullname ?? ''}%` } }
          ]
      }
    })
    return user
  }

  async findByPkUserAccount (data: FindByPkUserAccountDTO): Promise<FoundUserAccountModel | null> {
    const user = await UserAccountModel.findByPk(data.userId)
    return user
  }
}
