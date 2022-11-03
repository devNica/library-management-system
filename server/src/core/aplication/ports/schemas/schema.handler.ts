import Joi from 'joi'
import { RequestModel } from '../http/http-request'

export type SchemaModel = Joi.ObjectSchema

export interface SchemaHandler {
  validate: (schema: SchemaModel, request: RequestModel) => Promise<Joi.ValidationResult>
}
