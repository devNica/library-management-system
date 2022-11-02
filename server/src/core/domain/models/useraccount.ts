/** HTTP REQUEST MODEL */

export interface SignUpRequestModel {
  email: string
  password: string
  fullname: string
  phoneNumber: string
}

export interface SigninRequestModel {
  email: string
  password: string
}

/** DTO's MODELS */
export interface UserDTO extends SignUpRequestModel {
  isRoot: boolean
  fkGroup: number
  expiresIn: number
  createdAt: number
}

export interface FindOneUserAccountDTO {
  userId?: string
  email?: string
  fullname?: string
}

export interface FindByPkUserAccountDTO extends Omit<FindOneUserAccountDTO, 'email' | 'fullname'> {}

/** REPOSITORY RESPONSE MODEL */
export interface RegisteredUserModel {
  id: string
  createdAt: number
}

export interface FoundUserAccountModel {
  id: string
  email: string
  password: string
  fullname: string
  phoneNumber: string
  createdAt: number
  isRoot: boolean
  expiresIn: number
}

/** HTTP RESPONSE MODEL */
export interface SignupResponseModel {
  userId: string
  createdAt: Date
}
