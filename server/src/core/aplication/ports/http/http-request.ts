export interface RequestModel<Body = any, Params = any, Query = any, Headers = any, Data = any> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers
  data?: Data
}
