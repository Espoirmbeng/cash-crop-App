const bcrypt = require('bcryptjs');
const repository = require('../auth/auth.repository');
const helpers = require('../auth/auth.helpers');
const AppError = require('../../utils/AppError');
const tokenHelper = require('../../utils/tokenHelper');
const { USER_ROLES, USER_STATUS, TOKEN_TYPE, ERROR_CODES } = require('../../config/constants');
const env = require('../../config/env');

const adminLogin = async (identifier, password, adminKey, req) => {
  if (adminKey !== env.ADMIN_ROUTE_SECRET) {
    throw new AppError('Not found', 404, ERROR_CODES.NOT_FOUND);
  }

  const user = await repository.findUserByIdentifier(identifier);
  if (!user) {
    throw new AppError('Invalid credentials', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  if (user.role !== USER_ROLES.ADMIN && user.role !== USER_ROLES.SUPER_ADMIN) {
    throw new AppError('Invalid credentials', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  if (user.status !== USER_STATUS.ACTIVE) {
    throw new AppError('Account not active', 403, ERROR_CODES.ACCOUNT_SUSPENDED);
  }

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    throw new AppError('Account locked', 403, ERROR_CODES.ACCOUNT_LOCKED);
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401, ERROR_CODES.INVALID_CREDENTIALS);
  }

  await repository.resetFailedAttempts(user.id);
  await repository.updateLastLogin(user.id);

  const accessToken = tokenHelper.generateAccessToken(user.id, user.role);
  const refreshToken = tokenHelper.generateRefreshToken(user.id);
  const refreshTokenHash = tokenHelper.hashToken(refreshToken);

  await repository.saveToken({
    user_id: user.id,
    token_hash: refreshTokenHash,
    type: TOKEN_TYPE.REFRESH_TOKEN,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  await repository.logAuditEvent(user.id, 'ADMIN_LOGIN', req, { ip: req.ip });

  return {
    user: helpers.sanitizeUser(user),
    accessToken,
    refreshToken
  };
};

module.exports = {
  adminLogin
};
