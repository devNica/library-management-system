export type HttpResponse =
  'successRequest' | 'createdRequest' | 'unAuthorizedRequest' |
  'forbiddenRequest' | 'badRequest' | 'internalServerErrorRequets' |
  'notFoundRequest' | 'payloadToLargeRequest' | 'unProcessableEntityRequest'

export interface ResponseModel<T> {
  type: HttpResponse
  message: string
  body: T
}

export interface ResponseHandler<T = any> {
  response: (body: T, type: HttpResponse, message: string) => Promise<ResponseModel<T>>
}
