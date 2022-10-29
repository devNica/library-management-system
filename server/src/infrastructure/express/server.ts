import express from 'express'
import constants from '../../common/constants'
import api from './api'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupProxy } from './setup/setup-proxy'
import { setupRoutes } from './setup/setup-routes'

export const app = express()

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

app.listen(constants.SERVER_PORT, () => {
  console.log(`Server is running on port: ${constants.SERVER_PORT}`)
})
