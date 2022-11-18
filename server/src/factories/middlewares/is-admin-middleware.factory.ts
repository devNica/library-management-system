import { jwtTokenAdapter } from '@common/adapter/security/jwt.adapter'
import { IsAdminMiddleware } from '@interface/middlewares/is-admin.middleware'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const isAdminMiddlewareFactory = () => {
  const jwtAdapter = jwtTokenAdapter
  const isAdminMiddleware = new IsAdminMiddleware(jwtAdapter)
  return { isAdminMiddleware }
}
