import { MiddlewareRequestModel } from '../http/http-middleware'

export interface Middleware {
  handleRequest: (requestModel: MiddlewareRequestModel) => Promise<void> | never
}
