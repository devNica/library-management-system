import express from 'express'
import api from './api'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupProxy } from './setup/setup-proxy'
import { setupRoutes } from './setup/setup-routes'

const port = 5400
export const app = express()

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
