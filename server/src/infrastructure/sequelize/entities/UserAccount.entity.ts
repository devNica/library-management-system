export interface UserAccountEntity {
  id: string
  email: string
  password: string
  fullname: string
  phoneNumber: string
  resetPassword: boolean
  expiresIn: number
  isRoot: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}
