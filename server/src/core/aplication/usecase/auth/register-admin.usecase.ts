import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InserAdminAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-admin-account.repository'
import { SignUpRequestModel, SignupResponseModel } from '@core/domain/models/useraccount'
import { SignUpUseCase } from '@core/domain/usecase/signup.usecase'
import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { addMinutesToCurrentDate } from '@common/helper/date.helper'

export class RegisterAdministrator implements SignUpUseCase {
  constructor (
    private readonly security: ArgonSecurityAdapter,
    private readonly set: InserAdminAccountRepository,
    private readonly get: FindUserAccountByParameters
  ) {}

  async execute (request: SignUpRequestModel): Promise<SignupResponseModel> | never {
    try {
      const data = {
        email: request.email,
        fullname: request.fullname
      }

      const already = await this.get.findUserAccount(data)
      if (already !== null) throw new Error('Email already register')

      const dto = {
        email: request.email,
        password: await this.security.hash(request.password),
        fullname: request.fullname,
        phoneNumber: request.phoneNumber,
        expiresIn: addMinutesToCurrentDate(new Date(), 20).getTime(),
        isRoot: false,
        fkGroup: 2,
        createdAt: Date.now()
      }

      const newUser = await this.set.insertAdminUser(dto)
      return { userId: newUser.id, createdAt: new Date(newUser.createdAt) }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`An error ocurred: ${error.message}`)
    }
  }
}
