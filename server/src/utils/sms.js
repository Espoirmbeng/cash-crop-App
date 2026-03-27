const AfricasTalking = require('africastalking');
const env = require('../config/env');

const credentials = {
  apiKey: env.AT_API_KEY,
  username: env.AT_USERNAME
};

const africasTalking = AfricasTalking(credentials);
const sms = africasTalking.SMS;

const sendOtpSms = async (phoneNumber, otp) => {
  try {
    const message = `Your AgriculNet code: ${otp}. Valid 10 min. Do not share.`;

    const response = await sms.send({
      to: [phoneNumber],
      message: message,
      from: env.AT_SENDER_ID
    });

    return {
      success: true,
      messageId: response.SMSMessageData?.Recipients?.[0]?.messageId
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendOtpSms
};
