const Joi = require('joi');
const { CAMEROON_REGIONS, BUYER_TYPES } = require('../../config/constants');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^\+237[0-9]{9}$/;

const registerFarmerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(phonePattern).required().messages({
    'string.pattern.base': 'Phone must be a valid Cameroon number (+237XXXXXXXXX)'
  }),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).max(128).pattern(passwordPattern).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  region: Joi.string().valid(...CAMEROON_REGIONS).required(),
  city: Joi.string().min(2).max(100).required(),
  farmName: Joi.string().max(200).optional(),
  cropsGrown: Joi.array().items(Joi.string()).max(20).optional(),
  agreeToTerms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must agree to the terms and conditions'
  })
});

const registerBuyerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(phonePattern).required().messages({
    'string.pattern.base': 'Phone must be a valid Cameroon number (+237XXXXXXXXX)'
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).pattern(passwordPattern).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  buyerType: Joi.string().valid(...Object.values(BUYER_TYPES)).required(),
  country: Joi.string().min(2).max(100).required(),
  companyName: Joi.string().max(200).optional(),
  preferredCrops: Joi.array().items(Joi.string()).optional(),
  agreeToTerms: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must agree to the terms and conditions'
  })
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
  rememberMe: Joi.boolean().optional()
});

const sendOtpSchema = Joi.object({
  phone: Joi.string().pattern(phonePattern).optional(),
  userId: Joi.string().uuid().optional()
}).xor('phone', 'userId').messages({
  'object.xor': 'Either phone or userId must be provided'
});

const confirmOtpSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  otp: Joi.string().length(6).pattern(/^\d{6}$/).required().messages({
    'string.pattern.base': 'OTP must be 6 digits'
  })
});

const forgotPasswordSchema = Joi.object({
  identifier: Joi.string().required(),
  method: Joi.string().valid('sms', 'email').required()
});

const resetPasswordSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  newPassword: Joi.string().min(8).max(128).pattern(passwordPattern).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  token: Joi.string().optional(),
  otp: Joi.string().length(6).pattern(/^\d{6}$/).optional()
}).xor('token', 'otp').messages({
  'object.xor': 'Either token or otp must be provided'
});

module.exports = {
  registerFarmerSchema,
  registerBuyerSchema,
  loginSchema,
  sendOtpSchema,
  confirmOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
