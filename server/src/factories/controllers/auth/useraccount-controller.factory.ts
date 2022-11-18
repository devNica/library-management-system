import { RedisAdapter } from '@common/adapter/cache/redis.adapter'
import { ArgonSecurityAdapter } from '@common/adapter/security/argon.adapter'
import { jwtTokenAdapter } from '@common/adapter/security/jwt.adapter'
import { GetListUserAccounts } from '@core/aplication/usecase/auth/getlist-useraccounts.usecase'
import { SigninAdmin } from '@core/aplication/usecase/auth/signin-admin.usecase'
import { SignupAdmin } from '@core/aplication/usecase/auth/signup-admin.usecase'
import { GetListUserAccountsResponseModel, SigninResponseModel, SignupResponseModel } from '@core/domain/models/useraccount'
import { findAllUserAccount, findUserAccount, insertAdminUser } from '@infrastructure/repositories'
import { GetListUserAccountsController } from '@interface/controllers/get-useraccounts.controller'
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
    findUserAccount,
    new ArgonSecurityAdapter(),
    jwtTokenAdapter,
    new RedisAdapter()
  )

  const getUserAccountUC = new GetListUserAccounts(
    findAllUserAccount
  )

  const signupAdminPresenter = new GenericResponseInterface<SignupResponseModel>()
  const signinAdminPresenter = new GenericResponseInterface<SigninResponseModel>()
  const getUserAccountPresenter = new GenericResponseInterface<GetListUserAccountsResponseModel[]>()
  const signupAdminController = new SignupAdminController(signupAdminUC, signupAdminPresenter)
  const signinAdminControlller = new SigninAdminController(signinAdminUC, signinAdminPresenter)
  const getUserAccountsController = new GetListUserAccountsController(getUserAccountUC, getUserAccountPresenter)

  return {
    signupAdminUC,
    signupAdminPresenter,
    signupAdminController,
    signinAdminControlller,
    getUserAccountsController
  }
}
