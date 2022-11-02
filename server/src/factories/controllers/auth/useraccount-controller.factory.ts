import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { RegisterAdministrator } from '@core/aplication/usecase/auth/register-admin.usecase'
import { SignupResponseModel } from '@core/domain/models/useraccount'
import { findUserAccount, insertAdminUser } from '@infrastructure/repositories'
import { UserAdminRegControlerInterface } from '@interface/controllers/useraccount-reg-controller.interface'
import { GenericResponseInterface } from '@interface/responses/generic-response.interface'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const regAdminUseCase = new RegisterAdministrator(
    new ArgonSecurityAdapter(),
    insertAdminUser,
    findUserAccount
  )

  const userAdminRegPresenter = new GenericResponseInterface<SignupResponseModel>()
  const userAdminRegController = new UserAdminRegControlerInterface(regAdminUseCase, userAdminRegPresenter)

  return {
    regAdminUseCase,
    userAdminRegPresenter,
    userAdminRegController
  }
}
