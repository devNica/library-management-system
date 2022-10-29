import { Application } from 'express'

export const setupProxy = (app: Application): void => {
  app.set('trust proxy', 1)
  app.disabled('x-powered-by')
}
