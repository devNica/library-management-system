import Redis from 'ioredis'
import constants from './constants'

const { REDIS } = constants

export const redisInstance = new Redis(`redis://:${REDIS.PASSWORD}@${REDIS.HOST}:${REDIS.PORT}/4`)
