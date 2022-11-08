import { Controller } from '@core/aplication/ports/controller/controller'
import { ResponseHandler, ResponseModel } from '@core/aplication/ports/http/http-response'
import { SignUpUseCase } from '@core/domain/usecase/useraccount.usecase'
import { SignupResponseModel, SignUpRequestModel } from '@core/domain/models/useraccount'
import { RequestModel } from '@core/aplication/ports/http/http-request'
import { GenericErrorHandler } from '@core/aplication/ports/errors/error.handler'

export class SignupAdminController implements Controller<SignupResponseModel | never> {
  constructor (
    private readonly userAdminUC: SignUpUseCase,
    private readonly presenter: ResponseHandler<SignupResponseModel>
  ) {}

  async handleRequest (request: RequestModel<SignUpRequestModel>): Promise<ResponseModel<SignupResponseModel>> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!request || !request?.body) {
      throw new GenericErrorHandler('Invalid Request', 'badRequest')
    }

    try {
      const { email, password, fullname, phoneNumber } = request.body
      const newUser = await this.userAdminUC.execute({ email, password, fullname, phoneNumber })
      const response = await this.presenter.response(newUser, 'createdRequest', 'User account has been created successfully')
      return response
    } catch (error: any) {
      throw new GenericErrorHandler(error.message, 'badRequest')
    }
  }
}
