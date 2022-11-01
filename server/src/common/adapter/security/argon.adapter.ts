import argon from 'argon2'
import { PasswordHashing } from '@core/aplication/ports/security/password-hashing'

export class ArgonSecurityAdapter implements PasswordHashing {
  async hash (password: string): Promise<string> {
    return await argon.hash(password)
  }

  async compare (password: string, hash: string): Promise<boolean> {
    return await argon.verify(hash, password)
  }
}
