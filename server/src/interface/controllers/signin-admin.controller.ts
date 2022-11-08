import { Controller } from '@core/aplication/ports/controller/controller'
import { ResponseHandler, ResponseModel } from '@core/aplication/ports/http/http-response'
import { SigninUseCase } from '@core/domain/usecase/useraccount.usecase'
import { SigninResponseModel, SigninRequestModel } from '@core/domain/models/useraccount'
import { RequestModel } from '@core/aplication/ports/http/http-request'
import { GenericErrorHandler } from '@core/aplication/ports/errors/error.handler'

export class SigninAdminController implements Controller<SigninResponseModel | never> {
  constructor (
    private readonly uc: SigninUseCase,
    private readonly presenter: ResponseHandler<SigninResponseModel>
  ) {}

  async handleRequest (request: RequestModel<SigninRequestModel>): Promise<ResponseModel<SigninResponseModel>> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!request || !request?.body) {
      throw new GenericErrorHandler('Invalid Request', 'badRequest')
    }

    try {
      const { email, password } = request.body
      const newUser = await this.uc.execute({ email, password })
      const response = await this.presenter.response(newUser, 'createdRequest', 'User account has been created successfully')
      return response
    } catch (error: any) {
      throw new GenericErrorHandler(error.message, 'badRequest')
    }
  }
}
