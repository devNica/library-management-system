import { Router } from 'express'
import testRouter from './test.router'

export interface APYType {
  path: string
  controller: Router
}

export default function api (): APYType[] {
  return [
    { path: '/test', controller: testRouter }
  ]
}
