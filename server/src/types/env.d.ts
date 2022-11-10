declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number
      DB_NAME: string
      DB_PORT: number
      DB_USER: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_DIALECT: 'mysql' | 'postgres'
      NODE_ENV: 'development' | 'test' | 'production'
      JWTROOT: string
      JWTADMIN: string
      JWTUSER: string
      JWTREFRESH: string
      REDIS_HOST: string
      REDIS_PORT: number
      REDIS_PASSWORD: string
    }
  }
}

export {}
