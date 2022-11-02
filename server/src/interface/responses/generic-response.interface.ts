import { HttpResponse, ResponseHandler, ResponseModel } from '@core/aplication/ports/http/http-response'

export class GenericResponseInterface<T> implements ResponseHandler {
  async response (body: T, type: HttpResponse, message: string): Promise<ResponseModel<T>> {
    return {
      type, body, message
    }
  }
}
