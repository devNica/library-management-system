import { SignUpRequestModel, SignupResponseModel } from '../models/useraccount'

export interface SignUpUseCase {
  execute: (data: SignUpRequestModel) => Promise<SignupResponseModel> | never
}
