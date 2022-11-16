import 'dotenv/config'

export default {
  ENVIROMENT: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  PREFIX: '/api/v1',
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    PASSWORD: process.env.REDIS_PASSWORD
  },
  CACHE: {
    REFRESH_TOKEN: 'refreshToken'
  },
  DB: {
    DBNAME: process.env.DB_NAME,
    DBPORT: process.env.DB_PORT,
    DBUSER: process.env.DB_USER,
    DBPASS: process.env.DB_PASSWORD,
    DBHOST: process.env.DB_HOST,
    DIALECT: process.env.DB_DIALECT
  },
  SECRET_TOKEN: {
    root: process.env.JWTROOT,
    admin: process.env.JWTADMIN,
    refresh: process.env.JWTREFRESH,
    user: process.env.JWTUSER
  },
  SECRET_TOKEN_EXP: '5m',
  REFRESH_TOKEN_EXP: '15m'

}
