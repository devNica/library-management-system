/** REQUEST MODEL */

export interface SignUpRequestModel {
  email: string
  password: string
  fullname: string
  phoneNumber: string
}

export interface SigninRequest {
  email: string
  password: string
}

/** DTO MODELS */
export interface InsertUserAccountDTO extends SignUpRequestModel {
  isRoot: boolean
  expiresIn: number
  createdAt: number
}

export interface RegisteredAccount {
  id: string
  createdAt: number
}

export interface FindOneUserAccountDTO {
  userId?: string
  email?: string
  fullname?: string
}

export interface FindByPkUserAccountDTO extends Omit<FindOneUserAccountDTO, 'email' | 'fullname'> {}

export interface UserAccountFound {
  id: string
  email: string
  password: string
  fullname: string
  phoneNumber: string
  createdAt: number
  isRoot: boolean
  expiresIn: number
}

/** RESPONSE MODEL */
export interface SignupResponseModel {
  userId: string
}
