/* eslint-disable @typescript-eslint/restrict-template-expressions */
import constants from '@common/config/constants'
import { Router } from 'express'
import authRouter from './auth.router'
import testRouter from './test.router'

export interface APYType {
  path: string
  controller: Router
}

export default function api (): APYType[] {
  return [
    { path: `${constants.PREFIX}/test`, controller: testRouter },
    { path: `${constants.PREFIX}/auth`, controller: authRouter }
  ]
}
