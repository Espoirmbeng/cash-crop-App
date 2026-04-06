const Joi = require('joi');
const { CAMEROON_REGIONS, BUYER_TYPES } = require('../../config/constants');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phonePattern = /^\+237[0-9]{9}$/;
const optionalEmail = Joi.string().email().allow('', null);
const acceptedTerms = Joi.boolean().valid(true);

const registerFarmerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(phonePattern).required().messages({
    'string.pattern.base': 'Phone must be a valid Cameroon number (+237XXXXXXXXX)'
  }),
  email: optionalEmail.optional(),
  password: Joi.string().min(8).max(128).pattern(passwordPattern).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  region: Joi.string().valid(...CAMEROON_REGIONS).required(),
  city: Joi.string().min(2).max(100).required(),
  primaryCrop: Joi.string().min(2).max(120).optional(),
  harvestVolume: Joi.string().min(2).max(120).optional(),
  cooperative: Joi.string().max(200).allow('').optional(),
  farmName: Joi.string().max(200).allow('').optional(),
  cropsGrown: Joi.array().items(Joi.string()).max(20).optional(),
  exportReady: Joi.boolean().optional(),
  inspectionPreference: Joi.string().max(200).allow('').optional(),
  payoutMethod: Joi.string().max(100).allow('').optional(),
  accountName: Joi.string().max(200).allow('').optional(),
  payoutPhone: Joi.string().pattern(phonePattern).allow('', null).optional().messages({
    'string.pattern.base': 'Payout phone must be a valid Cameroon number (+237XXXXXXXXX)'
  }),
  notificationOptIn: Joi.boolean().optional(),
  acceptedTerms: acceptedTerms.optional(),
  agreeToTerms: acceptedTerms.optional()
})
  .or('acceptedTerms', 'agreeToTerms')
  .messages({
    'object.missing': 'You must agree to the terms and conditions'
  });

const registerBuyerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).optional(),
  lastName: Joi.string().min(2).max(100).optional(),
  contactName: Joi.string().min(2).max(200).optional(),
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
  companyName: Joi.string().max(200).allow('', null).optional(),
  preferredCrops: Joi.array().items(Joi.string()).optional(),
  buyingFocus: Joi.string().max(255).allow('', null).optional(),
  monthlyVolume: Joi.string().max(120).allow('', null).optional(),
  destination: Joi.string().max(160).allow('', null).optional(),
  agreedToPolicy: acceptedTerms.optional(),
  agreeToTerms: acceptedTerms.optional()
})
  .custom((value, helpers) => {
    const hasExplicitName = value.firstName && value.lastName;
    if (!value.contactName && !hasExplicitName) {
      return helpers.error('any.custom', { message: 'Provide a contact name or separate first and last names' });
    }
    return value;
  })
  .or('agreedToPolicy', 'agreeToTerms')
  .messages({
    'object.missing': 'You must agree to the terms and conditions',
    'any.custom': '{{#message}}'
  });

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
  rememberMe: Joi.boolean().optional()
});

const sendOtpSchema = Joi.object({
  phone: Joi.string().pattern(phonePattern).optional(),
  userId: Joi.string().uuid().optional(),
  purpose: Joi.string().optional()
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
  userId: Joi.string().uuid().optional(),
  identifier: Joi.string().optional(),
  newPassword: Joi.string().min(8).max(128).pattern(passwordPattern).required().messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  token: Joi.string().optional(),
  otp: Joi.string().length(6).pattern(/^\d{6}$/).optional()
}).custom((value, helpers) => {
  if (!value.token && !value.otp) {
    return helpers.error('any.custom', {
      message: 'Either token or otp must be provided'
    });
  }

  if (value.otp && !value.userId && !value.identifier) {
    return helpers.error('any.custom', {
      message: 'Either userId or identifier must be provided when using otp'
    });
  }

  return value;
}).messages({
  'any.custom': '{{#message}}'
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
