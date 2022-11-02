/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-route.adapter'
import { UserAccountControllerFactory } from '@factories/controllers/auth/useraccount-controller.factory'

const { userAdminRegController } = UserAccountControllerFactory()

const authRouter = Router()

authRouter.post('/signup/admin', expressRouterAdapter(userAdminRegController))

export default authRouter
