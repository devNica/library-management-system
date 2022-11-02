import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { Signup } from '@core/aplication/usecase/auth/signup.usecase'
import { SignupResponseModel } from '@core/domain/models/useraccount'
import { findUserAccount, insertUser } from '@infrastructure/repositories'
import { UserAccountRegControlerInterface } from '@interface/controllers/useraccount-reg-controller.interface'
import { GenericResponseInterface } from '@interface/responses/generic-response.interface'

export const UserAccountRegControllerFactory = (): any => {
  const userAccountRegUseCase = new Signup(
    new ArgonSecurityAdapter(),
    insertUser,
    findUserAccount
  )

  const userAccRegPresenter = new GenericResponseInterface<SignupResponseModel>()
  const userAccRegController = new UserAccountRegControlerInterface(userAccountRegUseCase, userAccRegPresenter)

  return {
    userAccountRegUseCase,
    userAccRegPresenter,
    userAccRegController
  }
}
