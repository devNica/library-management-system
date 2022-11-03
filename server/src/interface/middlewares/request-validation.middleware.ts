/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { MiddlewareRequestModel } from '@core/aplication/ports/http/http-middleware'
import { RequestModel } from '@core/aplication/ports/http/http-request'
import { Middleware } from '@core/aplication/ports/middleware/middleware'
import { SchemaHandler, SchemaModel } from '@core/aplication/ports/schemas/schema.handler'
import { ObjectSchema, ValidationResult } from 'joi'

export class RequestValidationMiddleware implements Middleware, SchemaHandler {
  constructor (
    private readonly _schema: SchemaModel
  ) {}

  async handleRequest (requestModel: MiddlewareRequestModel): Promise<void> {
    try {
      await this.validate(this._schema, requestModel)
    } catch (error: any) {
      const { message } = error.details[0]
      throw new Error(`badRequest,${message}`)
    }
  }

  async validate (schema: ObjectSchema<any>, request: RequestModel): Promise<ValidationResult<any>> {
    return await schema.validateAsync(request.body, { abortEarly: false, allowUnknown: true })
  }
}
