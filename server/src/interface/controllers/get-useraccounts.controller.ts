import { Controller } from '@core/aplication/ports/controller/controller'
import { GenericErrorHandler } from '@core/aplication/ports/errors/error.handler'
import { RequestModel } from '@core/aplication/ports/http/http-request'
import { ResponseHandler, ResponseModel } from '@core/aplication/ports/http/http-response'
import { GetListUserAccountsResponseModel } from '@core/domain/models/useraccount'
import { GetListUserAccountsUseCase } from '@core/domain/usecase/useraccount.usecase'

export class GetListUserAccountsController implements Controller<GetListUserAccountsResponseModel[] | never> {
  constructor (
    private readonly uc: GetListUserAccountsUseCase,
    private readonly presenter: ResponseHandler<GetListUserAccountsResponseModel[]>
  ) {}

  async handleRequest (request: RequestModel<{}>): Promise<ResponseModel<GetListUserAccountsResponseModel[]>> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!request || !request?.body) {
      throw new GenericErrorHandler('Invalid Request', 'badRequest')
    }

    try {
      const accounts = await this.uc.execute()
      const response = await this.presenter.response(accounts, 'successRequest', 'The request to the server has been successful')
      return response
    } catch (error: any) {
      throw new GenericErrorHandler(error.message, 'badRequest')
    }
  }
}
