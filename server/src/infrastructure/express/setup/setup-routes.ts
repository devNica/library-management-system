import { Application } from 'express'
import { APYType } from '../api'

export const setupRoutes = (app: Application, routes: APYType[]): void => {
  routes.forEach(r => {
    app.use(r.path, r.controller)
  })

  app.use((_res, res) => {
    const error = new Error('Internal Server Error')
    res.json({ msg: error.message }).status(500)
  })
}
