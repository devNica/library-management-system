import { Application } from 'express'
import { ApiResponse } from '../adapters/api-reponse.adapter'
import { APYType } from '../api'

export const setupRoutes = (app: Application, routes: APYType[]): void => {
  routes.forEach(r => {
    app.use(r.path, r.controller)
  })

  app.use((_req, _res, next) => {
    const error = new Error('Internal Server Error')
    next(ApiResponse.internalServerErrorRequets(error.message, {}))
  })
}
