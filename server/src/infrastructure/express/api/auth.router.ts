/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-route.adapter'
import { UserAccountControllerFactory } from '@factories/controllers/auth/useraccount-controller.factory'
import { expressMiddlewareAdapter } from '../adapters/express-middleware.adapter'
import { RequestValidationMiddlewareFactory } from '@factories/middlewares/req-validation-middleware.factory'
import { adminUserRegSchema } from '@interface/validators/auth.schema'

const { userAdminRegController } = UserAccountControllerFactory()

const authRouter = Router()

authRouter.post('/signup/admin',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(adminUserRegSchema)),
  expressRouterAdapter(userAdminRegController))

export default authRouter
