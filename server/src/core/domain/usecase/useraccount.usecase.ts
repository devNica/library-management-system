import { SigninRequestModel, SigninResponseModel, SignUpRequestModel, SignupResponseModel } from '../models/useraccount'

export interface SignUpUseCase {
  execute: (data: SignUpRequestModel) => Promise<SignupResponseModel> | never
}

export interface SigninUseCase {
  execute: (data: SigninRequestModel) => Promise<SigninResponseModel> | never
}
