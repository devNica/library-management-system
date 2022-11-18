import { HttpResponse } from '@core/aplication/ports/http/http-response'
import { Middleware } from '@core/aplication/ports/middleware/middleware'
import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from './api-reponse.adapter'

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return await Promise.resolve(
      middleware.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        method: request.method
      })
        .then(() => next())
        .catch(err => {
          console.log('ERROR ENCONTRADO: ', err)
          const r = err.message.split(',')
          const type: HttpResponse = r[0]
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          next(ApiResponse[`${type}`](r[1], {}))
        })
    )
  }
}
