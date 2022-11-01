import { RequestModel } from '../http/http-request'
import { ResponseModel } from '../http/http-response'

export interface Controller<T = unknown> {
  handleRequest: (requestModel: RequestModel) => Promise<ResponseModel<T>>
}
