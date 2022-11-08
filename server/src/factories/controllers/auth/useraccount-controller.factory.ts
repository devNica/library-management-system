import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { SigninAdmin } from '@core/aplication/usecase/auth/signin-admin.usecase'
import { SignupAdmin } from '@core/aplication/usecase/auth/signup-admin.usecase'
import { SigninResponseModel, SignupResponseModel } from '@core/domain/models/useraccount'
import { findUserAccount, insertAdminUser } from '@infrastructure/repositories'
import { SigninAdminController } from '@interface/controllers/signin-admin.controller'
import { SignupAdminController } from '@interface/controllers/signup-admin.controller'
import { GenericResponseInterface } from '@interface/responses/generic-response.interface'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const signupAdminUC = new SignupAdmin(
    new ArgonSecurityAdapter(),
    insertAdminUser,
    findUserAccount
  )

  const signinAdminUC = new SigninAdmin(
    findUserAccount
  )

  const signupAdminPresenter = new GenericResponseInterface<SignupResponseModel>()
  const signinAdminPresenter = new GenericResponseInterface<SigninResponseModel>()
  const signupAdminController = new SignupAdminController(signupAdminUC, signupAdminPresenter)
  const signinAdminControlller = new SigninAdminController(signinAdminUC, signinAdminPresenter)

  return {
    signupAdminUC,
    signupAdminPresenter,
    signupAdminController,
    signinAdminControlller
  }
}
