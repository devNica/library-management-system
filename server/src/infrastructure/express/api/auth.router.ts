/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-route.adapter'
import { UserAccountControllerFactory } from '@factories/controllers/auth/useraccount-controller.factory'
import { expressMiddlewareAdapter } from '../adapters/express-middleware.adapter'
import { RequestValidationMiddlewareFactory } from '@factories/middlewares/req-validation-middleware.factory'
import { signupAdminSchema, signinAdminSchema } from '@interface/validators/auth.schema'

const { signupAdminController, signinAdminControlller } = UserAccountControllerFactory()

const authRouter = Router()

authRouter.post('/signup/admin',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(signupAdminSchema)),
  expressRouterAdapter(signupAdminController))

authRouter.post('/signin/admin',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(signinAdminSchema)),
  expressRouterAdapter(signinAdminControlller))

export default authRouter
