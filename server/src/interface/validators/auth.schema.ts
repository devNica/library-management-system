import Joi from 'joi'

export const signupAdminSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'The email field is required',
    'string.base': 'the format of the email field is incorrect',
    'string.email': 'the format of the email field is incorrect'
  }),
  password: Joi.string().required().messages({
    'any.required': 'The password field is required',
    'string.base': 'the format of the password field is incorrect'
  }),
  fullname: Joi.string().required().messages({
    'any.required': 'The fullname field is required',
    'string.base': 'the format of the fullname field is incorrect'
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'The phone number field is required',
    'string.base': 'the format of the phone number field is incorrect'
  })
})

export const signinAdminSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'The email field is required',
    'string.base': 'the format of the email field is incorrect',
    'string.email': 'the format of the email field is incorrect'
  }),
  password: Joi.string().required().messages({
    'any.required': 'The password field is required',
    'string.base': 'the format of the password field is incorrect'
  })
})
