import { SignUpRequestModel, SignupResponseModel } from '../models/useraccount'

export interface SignUpUseCase {
  execute: (signUpModel: SignUpRequestModel) => Promise<SignupResponseModel> | never
}
