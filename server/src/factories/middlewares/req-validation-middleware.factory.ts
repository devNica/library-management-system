import { SchemaModel } from '@core/aplication/ports/schemas/schema.handler'
import { RequestValidationMiddleware } from '@interface/middlewares/request-validation.middleware'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const RequestValidationMiddlewareFactory = (schema: SchemaModel) => {
  return new RequestValidationMiddleware(schema)
}
