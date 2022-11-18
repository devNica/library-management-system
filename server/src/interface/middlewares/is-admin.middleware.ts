import { JWTTokenSecurity } from '@common/adapter/security/jwt.adapter'
import { GenericErrorHandler } from '@core/aplication/ports/errors/error.handler'
import { MiddlewareRequestModel } from '@core/aplication/ports/http/http-middleware'
import { Middleware } from '@core/aplication/ports/middleware/middleware'
import { objectKeyExists } from '@common/helper/object.helper'

export class IsAdminMiddleware implements Middleware {
  constructor (
    private readonly jwtTokenAdapter: JWTTokenSecurity
  ) {}

  async handleRequest (request: MiddlewareRequestModel): Promise<void> | never {
    if (
      !objectKeyExists(request, 'headers') ||
      !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new GenericErrorHandler('Invalid Request', 'badRequest')
    }

    const { authorization } = request.headers
    const token = authorization.split(' ')[1]

    try {
      if (token === undefined || token === null) throw new GenericErrorHandler('Token not found', 'unAuthorizedRequest')

      const data = await this.jwtTokenAdapter.verifyAdminToken(token)
      request.data = data
    } catch (error: any) {
      throw new GenericErrorHandler('Token no valid', 'forbiddenRequest')
    }
  }
}
