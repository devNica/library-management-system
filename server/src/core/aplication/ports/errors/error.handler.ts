import { HttpResponse, ResponseModel } from '../http/http-response'

export interface ErrorParams {
  type: string
  message: string
}

export type ErrorResponseModel = Omit<ResponseModel<ErrorParams>, 'body'>

export class GenericErrorHandler extends Error implements ErrorResponseModel {
  public type: HttpResponse
  public message: string

  constructor (message: string, type: HttpResponse) {
    super(message)
    this.message = `${type},${message}`
    this.type = type
  }
}
