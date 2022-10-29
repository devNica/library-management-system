import { Router } from 'express'

const testRouter = Router()

testRouter.get('/', (_req, res): void => {
  res.json({ msg: 'this is an API' }).status(200)
})

export default testRouter
