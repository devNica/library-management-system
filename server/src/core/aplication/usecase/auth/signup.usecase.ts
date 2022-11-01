import { FindUserAccountByParameters } from '@core/aplication/ports/repositories/useraccount/findone-useraccount.repository'
import { InsertUserAccountRepository } from '@core/aplication/ports/repositories/useraccount/insert-useraccount.repository'
import { SignUpRequestModel, SignupResponseModel } from '@core/domain/models/useraccount'
import { SignUpUseCase } from '@core/domain/usecase/signup.usecase'
import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { addMinutesToCurrentDate } from '@common/helper/date.helper'

export class Signup implements SignUpUseCase {
  constructor (
    private readonly argonSecurity: ArgonSecurityAdapter,
    private readonly insertUser: InsertUserAccountRepository,
    private readonly findOneUser: FindUserAccountByParameters
  ) {}

  async execute (request: SignUpRequestModel): Promise<SignupResponseModel> | never {
    const data = {
      email: request.email,
      fullname: request.fullname
    }

    const already = await this.findOneUser.findUserAccount(data)
    if (already !== null) throw new Error('Email already register')

    const dto = {
      email: request.email,
      password: await this.argonSecurity.hash(request.password),
      fullname: request.fullname,
      phoneNumber: request.phoneNumber,
      expiresIn: addMinutesToCurrentDate(new Date(), 20).getTime(),
      isRoot: false,
      createdAt: Date.now()
    }

    const newUser = await this.insertUser.insertUser(dto)
    return { userId: newUser.id }
  }
}
