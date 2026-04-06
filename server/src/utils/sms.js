const env = require('../config/env');

const sendOtpSms = async (phoneNumber, otp) => {
  const message = `Your AgriculNet code: ${otp}. Valid 10 min. Do not share.`;
  const devHints = env.EXPOSE_DEV_AUTH_HINTS
    ? { otpCode: otp, phoneNumber }
    : null;

  if (!env.AT_API_KEY || !env.AT_USERNAME) {
    if (env.ALLOW_DEV_DELIVERY_FALLBACK) {
      return {
        success: true,
        delivered: false,
        provider: 'development-fallback',
        devHints
      };
    }

    throw new Error('SMS credentials are not configured');
  }

  try {
    const AfricasTalking = require('africastalking');
    const africasTalking = AfricasTalking({
      apiKey: env.AT_API_KEY,
      username: env.AT_USERNAME
    });

    const response = await africasTalking.SMS.send({
      to: [phoneNumber],
      message,
      from: env.AT_SENDER_ID
    });

    return {
      success: true,
      delivered: true,
      provider: 'africas-talking',
      messageId: response.SMSMessageData?.Recipients?.[0]?.messageId,
      devHints
    };
  } catch (error) {
    if (env.ALLOW_DEV_DELIVERY_FALLBACK) {
      return {
        success: true,
        delivered: false,
        provider: 'development-fallback',
        error: error.message,
        devHints
      };
    }

    throw error;
  }
};

module.exports = {
  sendOtpSms
};
