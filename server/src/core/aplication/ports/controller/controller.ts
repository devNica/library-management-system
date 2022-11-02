import { RequestModel } from '../http/http-request'
import { ResponseModel } from '../http/http-response'

export interface Controller<T = unknown> {
  handleRequest: (data: RequestModel) => Promise<ResponseModel<T>>
}
