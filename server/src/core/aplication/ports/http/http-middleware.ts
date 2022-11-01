import { RequestModel } from './http-request'

export interface MiddlewareRequestModel extends RequestModel {
  method?: string
}
