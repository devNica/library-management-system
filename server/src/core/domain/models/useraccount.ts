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
  fkProfile: number
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

type profileTypes = 'root' | 'admin' | 'user' | 'refresh'

export interface FoundUserAccountModel {
  id: string
  email: string
  password: string
  fullname: string
  phoneNumber: string
  profileName?: profileTypes
  resetPassword: boolean
  createdAt: number
  isActive: boolean
  isRoot: boolean
  expiresIn: number
}

/** HTTP RESPONSE MODEL */
export interface SignupResponseModel {
  userId: string
  createdAt: Date
}

export interface SigninResponseModel {
  user: {
    userId: string
    email: string
    fullname: string
    resetPassword: boolean
    phoneNumber: string
    isActive: boolean
    profile: string
  }
  token: string
}
