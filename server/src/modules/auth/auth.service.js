const bcrypt = require('bcryptjs');
const repository = require('./auth.repository');
const helpers = require('./auth.helpers');
const AppError = require('../../utils/AppError');
const tokenHelper = require('../../utils/tokenHelper');
const otpUtil = require('../../utils/otp');
const mailer = require('../../utils/mailer');
const sms = require('../../utils/sms');
const {
  USER_ROLES,
  USER_STATUS,
  TOKEN_TYPE,
  OTP_PURPOSE,
  ERROR_CODES
} = require('../../config/constants');
const env = require('../../config/env');

const registerFarmer = async (data, req) => {
  const phone = helpers.normalizePhone(data.phone);
  const existingPhone = await repository.findUserByPhone(phone);
  if (existingPhone) {
    throw new AppError('Phone number already registered', 409, ERROR_CODES.DUPLICATE_PHONE);
  }

  if (data.email) {
    const existingEmail = await repository.findUserByEmail(data.email);
    if (existingEmail) {
      throw new AppError('Email already registered', 409, ERROR_CODES.DUPLICATE_EMAIL);
    }
  }

  const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_SALT_ROUNDS);

  const user = await repository.createUser({
    role: USER_ROLES.FARMER,
    status: USER_STATUS.PENDING_VERIFICATION,
    first_name: data.firstName,
    last_name: data.lastName,
    phone,
    email: data.email ? data.email.toLowerCase() : null,
    password_hash: passwordHash,
    phone_verified: false,
    email_verified: false,
    region: data.region,
    city: data.city,
    country: 'Cameroon'
  });

  await repository.createFarmerProfile(user.id, {
    farm_name: data.farmName || null,
    crops_grown: data.cropsGrown || []
  });

  const otpCode = otpUtil.generateOtp();
  const otpHash = await otpUtil.hashOtp(otpCode);
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000);

  await repository.deleteUserOtps(user.id, OTP_PURPOSE.PHONE_VERIFICATION);
  await repository.saveOtp({
    user_id: user.id,
    phone,
    otp_hash: otpHash,
    purpose: OTP_PURPOSE.PHONE_VERIFICATION,
    expires_at: expiresAt.toISOString()
  });

  await sms.sendOtpSms(phone, otpCode);

  if (data.email) {
    const rawToken = tokenHelper.generateCryptoToken();
    const tokenHash = tokenHelper.hashToken(rawToken);
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await repository.saveToken({
      user_id: user.id,
      token_hash: tokenHash,
      type: TOKEN_TYPE.EMAIL_VERIFICATION,
      expires_at: tokenExpires.toISOString()
    });

    const verifyLink = `${env.EMAIL_VERIFY_URL}?token=${rawToken}`;
    await mailer.sendVerificationEmail(data.email, data.firstName, verifyLink);
  }

  await repository.logAuditEvent(user.id, 'FARMER_REGISTERED', req, { phone, email: data.email });

  return {
    user: helpers.sanitizeUser(user),
    message: 'Registration successful. Please verify your phone number.',
    phone: helpers.maskPhone(phone)
  };
};

const registerBuyer = async (data, req) => {
  const phone = helpers.normalizePhone(data.phone);
  const existingPhone = await repository.findUserByPhone(phone);
  if (existingPhone) {
    throw new AppError('Phone number already registered', 409, ERROR_CODES.DUPLICATE_PHONE);
  }

  const existingEmail = await repository.findUserByEmail(data.email);
  if (existingEmail) {
    throw new AppError('Email already registered', 409, ERROR_CODES.DUPLICATE_EMAIL);
  }

  const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_SALT_ROUNDS);

  let role = USER_ROLES.LOCAL_BUYER;
  if (data.buyerType === 'international') role = USER_ROLES.INTERNATIONAL_BUYER;
  if (data.buyerType === 'business_reseller') role = USER_ROLES.LOCAL_BUYER;

  const user = await repository.createUser({
    role,
    status: USER_STATUS.PENDING_VERIFICATION,
    first_name: data.firstName,
    last_name: data.lastName,
    phone,
    email: data.email.toLowerCase(),
    password_hash: passwordHash,
    phone_verified: false,
    email_verified: false,
    region: data.region || null,
    city: data.city,
    country: data.country
  });

  await repository.createBuyerProfile(user.id, {
    buyer_type: data.buyerType,
    company_name: data.companyName || null,
    preferred_crops: data.preferredCrops || []
  });

  const otpCode = otpUtil.generateOtp();
  const otpHash = await otpUtil.hashOtp(otpCode);
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000);

  await repository.deleteUserOtps(user.id, OTP_PURPOSE.PHONE_VERIFICATION);
  await repository.saveOtp({
    user_id: user.id,
    phone,
    otp_hash: otpHash,
    purpose: OTP_PURPOSE.PHONE_VERIFICATION,
    expires_at: expiresAt.toISOString()
  });

  await sms.sendOtpSms(phone, otpCode);

  const rawToken = tokenHelper.generateCryptoToken();
  const tokenHash = tokenHelper.hashToken(rawToken);
  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await repository.saveToken({
    user_id: user.id,
    token_hash: tokenHash,
    type: TOKEN_TYPE.EMAIL_VERIFICATION,
    expires_at: tokenExpires.toISOString()
  });

  const verifyLink = `${env.EMAIL_VERIFY_URL}?token=${rawToken}`;
  await mailer.sendVerificationEmail(data.email, data.firstName, verifyLink);

  await repository.logAuditEvent(user.id, 'BUYER_REGISTERED', req, { phone, email: data.email, buyerType: data.buyerType });

  return {
    user: helpers.sanitizeUser(user),
    message: 'Registration successful. Please verify your phone and email.',
    phone: helpers.maskPhone(phone)
  };
};

const login = async (identifier, password, rememberMe, req) => {
  const user = await repository.findUserByIdentifier(identifier);
  if (!user) {
    throw new AppError('Invalid credentials', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  if (user.status === USER_STATUS.SUSPENDED || user.status === USER_STATUS.REJECTED) {
    throw new AppError('Account suspended', 403, ERROR_CODES.ACCOUNT_SUSPENDED);
  }

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    throw new AppError('Account temporarily locked', 403, ERROR_CODES.ACCOUNT_LOCKED, {
      lockedUntil: user.locked_until
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    await repository.incrementFailedAttempts(user.id);
    const updatedUser = await repository.findUserById(user.id);
    if (updatedUser.failed_login_attempts >= 5) {
      const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      await repository.lockUserAccount(user.id, lockUntil.toISOString());
    }
    throw new AppError('Invalid credentials', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  await repository.resetFailedAttempts(user.id);
  await repository.updateLastLogin(user.id);

  if (!user.phone_verified) {
    const otpCode = otpUtil.generateOtp();
    const otpHash = await otpUtil.hashOtp(otpCode);
    const expiresAt = new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000);

    await repository.deleteUserOtps(user.id, OTP_PURPOSE.PHONE_VERIFICATION);
    await repository.saveOtp({
      user_id: user.id,
      phone: user.phone,
      otp_hash: otpHash,
      purpose: OTP_PURPOSE.PHONE_VERIFICATION,
      expires_at: expiresAt.toISOString()
    });

    await sms.sendOtpSms(user.phone, otpCode);

    throw new AppError('Phone verification required', 403, ERROR_CODES.PHONE_NOT_VERIFIED, {
      userId: user.id,
      phone: helpers.maskPhone(user.phone)
    });
  }

  const accessToken = tokenHelper.generateAccessToken(user.id, user.role);
  const refreshToken = tokenHelper.generateRefreshToken(user.id, rememberMe);
  const refreshTokenHash = tokenHelper.hashToken(refreshToken);

  const refreshExpires = rememberMe
    ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await repository.saveToken({
    user_id: user.id,
    token_hash: refreshTokenHash,
    type: TOKEN_TYPE.REFRESH_TOKEN,
    expires_at: refreshExpires.toISOString()
  });

  await repository.logAuditEvent(user.id, 'LOGIN_SUCCESS', req, { method: 'password' });

  return {
    user: helpers.sanitizeUser(user),
    accessToken,
    refreshToken
  };
};

const logout = async (userId, refreshToken, req) => {
  if (refreshToken) {
    const tokenHash = tokenHelper.hashToken(refreshToken);
    const token = await repository.findToken(tokenHash, TOKEN_TYPE.REFRESH_TOKEN);
    if (token) {
      await repository.markTokenUsed(token.id);
    }
  }
  await repository.deleteUserTokens(userId, TOKEN_TYPE.REFRESH_TOKEN);
  await repository.logAuditEvent(userId, 'LOGOUT', req, {});
};

const refreshAccessToken = async (rawRefreshToken) => {
  let decoded;
  try {
    decoded = tokenHelper.verifyRefreshToken(rawRefreshToken);
  } catch {
    throw new AppError('Invalid refresh token', 401, ERROR_CODES.TOKEN_INVALID);
  }

  const tokenHash = tokenHelper.hashToken(rawRefreshToken);
  const token = await repository.findToken(tokenHash, TOKEN_TYPE.REFRESH_TOKEN);

  if (!token) {
    throw new AppError('Invalid refresh token', 401, ERROR_CODES.TOKEN_INVALID);
  }

  const user = await repository.findUserById(decoded.id);
  if (!user || user.status !== USER_STATUS.ACTIVE) {
    throw new AppError('User not found or inactive', 401, ERROR_CODES.UNAUTHORIZED);
  }

  const newAccessToken = tokenHelper.generateAccessToken(user.id, user.role);

  return {
    accessToken: newAccessToken,
    user: helpers.sanitizeUser(user)
  };
};

const verifyEmail = async (rawToken, req) => {
  const tokenHash = tokenHelper.hashToken(rawToken);
  const token = await repository.findToken(tokenHash, TOKEN_TYPE.EMAIL_VERIFICATION);

  if (!token) {
    throw new AppError('Invalid or expired verification link', 400, ERROR_CODES.TOKEN_INVALID);
  }

  const user = await repository.findUserById(token.user_id);
  await repository.updateUser(user.id, { email_verified: true });

  if (helpers.shouldAdvanceToActive(user)) {
    await repository.updateUser(user.id, { status: USER_STATUS.ACTIVE });
  } else if (helpers.shouldAdvanceToPendingReview(user)) {
    await repository.updateUser(user.id, { status: USER_STATUS.PENDING_REVIEW });
  }

  await repository.markTokenUsed(token.id);
  await repository.logAuditEvent(user.id, 'EMAIL_VERIFIED', req, {});

  return { message: 'Email verified successfully' };
};

const sendPhoneOtp = async (phone, userId, purpose, req) => {
  let user;
  if (userId) {
    user = await repository.findUserById(userId);
  } else if (phone) {
    const normalizedPhone = helpers.normalizePhone(phone);
    user = await repository.findUserByPhone(normalizedPhone);
  }

  if (!user) {
    throw new AppError('User not found', 404, ERROR_CODES.ACCOUNT_NOT_FOUND);
  }

  const targetPhone = phone ? helpers.normalizePhone(phone) : user.phone;
  const otpCode = otpUtil.generateOtp();
  const otpHash = await otpUtil.hashOtp(otpCode);
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000);

  await repository.deleteUserOtps(user.id, purpose || OTP_PURPOSE.PHONE_VERIFICATION);
  await repository.saveOtp({
    user_id: user.id,
    phone: targetPhone,
    otp_hash: otpHash,
    purpose: purpose || OTP_PURPOSE.PHONE_VERIFICATION,
    expires_at: expiresAt.toISOString()
  });

  const smsResult = await sms.sendOtpSms(targetPhone, otpCode);

  await repository.logAuditEvent(user.id, 'OTP_SENT', req, { purpose: purpose || OTP_PURPOSE.PHONE_VERIFICATION });

  return {
    success: smsResult.success,
    phone: helpers.maskPhone(targetPhone),
    expiresIn: env.OTP_EXPIRES_MINUTES * 60
  };
};

const confirmPhoneOtp = async (userId, otpCode, req) => {
  const user = await repository.findUserById(userId);
  if (!user) {
    throw new AppError('User not found', 404, ERROR_CODES.ACCOUNT_NOT_FOUND);
  }

  const otp = await repository.findLatestOtp(userId, OTP_PURPOSE.PHONE_VERIFICATION);
  if (!otp) {
    throw new AppError('OTP not found', 400, ERROR_CODES.OTP_INVALID);
  }

  if (new Date(otp.expires_at) < new Date()) {
    throw new AppError('OTP has expired', 400, ERROR_CODES.OTP_EXPIRED);
  }

  if (otp.attempts >= env.OTP_MAX_ATTEMPTS) {
    throw new AppError('Maximum attempts exceeded', 400, ERROR_CODES.OTP_MAX_ATTEMPTS);
  }

  await repository.incrementOtpAttempts(otp.id);

  const isValid = await otpUtil.verifyOtp(otpCode, otp.otp_hash);
  if (!isValid) {
    throw new AppError('Invalid OTP', 400, ERROR_CODES.OTP_INVALID);
  }

  await repository.markOtpVerified(otp.id);
  await repository.updateUser(userId, { phone_verified: true });

  if (helpers.shouldAdvanceToActive(user)) {
    await repository.updateUser(userId, { status: USER_STATUS.ACTIVE });
  } else if (helpers.shouldAdvanceToPendingReview(user)) {
    await repository.updateUser(userId, { status: USER_STATUS.PENDING_REVIEW });
  }

  await repository.logAuditEvent(userId, 'PHONE_VERIFIED', req, {});

  const updatedUser = await repository.findUserById(userId);
  if (helpers.shouldAdvanceToActive(updatedUser)) {
    const accessToken = tokenHelper.generateAccessToken(userId, updatedUser.role);
    const refreshToken = tokenHelper.generateRefreshToken(userId);
    const refreshTokenHash = tokenHelper.hashToken(refreshToken);

    await repository.saveToken({
      user_id: userId,
      token_hash: refreshTokenHash,
      type: TOKEN_TYPE.REFRESH_TOKEN,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    return {
      verified: true,
      message: 'Phone verified successfully',
      accessToken,
      refreshToken,
      user: helpers.sanitizeUser(updatedUser)
    };
  }

  return {
    verified: true,
    message: 'Phone verified successfully. Please verify your email to continue.'
  };
};

const forgotPassword = async (identifier, method, req) => {
  const user = await repository.findUserByIdentifier(identifier);
  if (!user) {
    return { message: 'If an account exists, a reset link has been sent' };
  }

  if (method === 'sms') {
    await sendPhoneOtp(user.phone, user.id, OTP_PURPOSE.PASSWORD_RESET, req);
  } else if (method === 'email' && user.email) {
    const rawToken = tokenHelper.generateCryptoToken();
    const tokenHash = tokenHelper.hashToken(rawToken);
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    await repository.saveToken({
      user_id: user.id,
      token_hash: tokenHash,
      type: TOKEN_TYPE.PASSWORD_RESET,
      expires_at: tokenExpires.toISOString()
    });

    const resetLink = `${env.PASSWORD_RESET_URL}?token=${rawToken}`;
    await mailer.sendPasswordResetEmail(user.email, user.first_name, resetLink);
  }

  await repository.logAuditEvent(user.id, 'PASSWORD_RESET_REQUESTED', req, { method });

  return { message: 'If an account exists, a reset link has been sent' };
};

const resetPassword = async (userId, newPassword, token, otp, req) => {
  const user = await repository.findUserById(userId);
  if (!user) {
    throw new AppError('User not found', 404, ERROR_CODES.ACCOUNT_NOT_FOUND);
  }

  let verified = false;

  if (token) {
    const tokenHash = tokenHelper.hashToken(token);
    const tokenRecord = await repository.findToken(tokenHash, TOKEN_TYPE.PASSWORD_RESET);
    if (!tokenRecord) {
      throw new AppError('Invalid or expired reset token', 400, ERROR_CODES.TOKEN_INVALID);
    }
    await repository.markTokenUsed(tokenRecord.id);
    verified = true;
  }

  if (otp) {
    const otpRecord = await repository.findLatestOtp(userId, OTP_PURPOSE.PASSWORD_RESET);
    if (!otpRecord) {
      throw new AppError('Invalid OTP', 400, ERROR_CODES.OTP_INVALID);
    }
    if (new Date(otpRecord.expires_at) < new Date()) {
      throw new AppError('OTP has expired', 400, ERROR_CODES.OTP_EXPIRED);
    }
    const isValid = await otpUtil.verifyOtp(otp, otpRecord.otp_hash);
    if (!isValid) {
      throw new AppError('Invalid OTP', 400, ERROR_CODES.OTP_INVALID);
    }
    await repository.markOtpVerified(otpRecord.id);
    verified = true;
  }

  if (!verified) {
    throw new AppError('Verification required', 400, ERROR_CODES.VALIDATION_ERROR);
  }

  const passwordHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);
  await repository.updateUser(userId, { password_hash: passwordHash });

  await repository.deleteUserTokens(userId, TOKEN_TYPE.REFRESH_TOKEN);

  await repository.logAuditEvent(userId, 'PASSWORD_RESET_COMPLETED', req, {});

  return { message: 'Password reset successfully. Please login again.' };
};

const getMe = async (userId) => {
  const user = await repository.findUserById(userId);
  if (!user) {
    throw new AppError('User not found', 404, ERROR_CODES.ACCOUNT_NOT_FOUND);
  }

  const result = { user: helpers.sanitizeUser(user) };

  if (user.role === USER_ROLES.FARMER) {
    const profile = await repository.getFarmerProfile(userId);
    result.profile = profile;
  } else if (user.role === USER_ROLES.LOCAL_BUYER || user.role === USER_ROLES.INTERNATIONAL_BUYER) {
    const profile = await repository.getBuyerProfile(userId);
    result.profile = profile;
  }

  return result;
};

const updateMe = async (userId, updateData) => {
  const allowedUserFields = ['first_name', 'last_name', 'region', 'city'];
  const userUpdates = {};

  for (const field of allowedUserFields) {
    if (updateData[field] !== undefined) {
      userUpdates[field] = updateData[field];
    }
  }

  if (Object.keys(userUpdates).length > 0) {
    await repository.updateUser(userId, userUpdates);
  }

  const user = await repository.findUserById(userId);
  const result = { user: helpers.sanitizeUser(user) };

  if (user.role === USER_ROLES.FARMER) {
    const allowedProfileFields = ['farm_name', 'bio', 'crops_grown'];
    const profileUpdates = {};
    for (const field of allowedProfileFields) {
      if (updateData[field] !== undefined) {
        profileUpdates[field] = updateData[field];
      }
    }
    if (Object.keys(profileUpdates).length > 0) {
      const { supabaseAdmin } = require('../../config/supabase');
      await supabaseAdmin
        .from('farmer_profiles')
        .update(profileUpdates)
        .eq('user_id', userId);
    }
    const profile = await repository.getFarmerProfile(userId);
    result.profile = profile;
  } else if (user.role === USER_ROLES.LOCAL_BUYER || user.role === USER_ROLES.INTERNATIONAL_BUYER) {
    const allowedProfileFields = ['company_name', 'preferred_crops'];
    const profileUpdates = {};
    for (const field of allowedProfileFields) {
      if (updateData[field] !== undefined) {
        profileUpdates[field] = updateData[field];
      }
    }
    if (Object.keys(profileUpdates).length > 0) {
      const { supabaseAdmin } = require('../../config/supabase');
      await supabaseAdmin
        .from('buyer_profiles')
        .update(profileUpdates)
        .eq('user_id', userId);
    }
    const profile = await repository.getBuyerProfile(userId);
    result.profile = profile;
  }

  return result;
};

const deactivateAccount = async (userId, password, req) => {
  const user = await repository.findUserById(userId);
  if (!user) {
    throw new AppError('User not found', 404, ERROR_CODES.ACCOUNT_NOT_FOUND);
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new AppError('Invalid password', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  await repository.updateUser(userId, { status: USER_STATUS.DEACTIVATED });
  await repository.deleteUserTokens(userId, TOKEN_TYPE.REFRESH_TOKEN);

  await repository.logAuditEvent(userId, 'ACCOUNT_DEACTIVATED', req, {});

  return { message: 'Account deactivated successfully' };
};

module.exports = {
  registerFarmer,
  registerBuyer,
  login,
  logout,
  refreshAccessToken,
  verifyEmail,
  sendPhoneOtp,
  confirmPhoneOtp,
  forgotPassword,
  resetPassword,
  getMe,
  updateMe,
  deactivateAccount
};
