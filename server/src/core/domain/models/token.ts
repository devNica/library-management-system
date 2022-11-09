export interface SignedToken {
  token: string
}

export interface Token {
  id: number
  token: string
  userId: string
  expiresIn: string
}

export type TokenRequestModel = Omit<Token, 'id'>
