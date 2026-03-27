const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../config/supabase');
const env = require('../config/env');
const { sendError } = require('../utils/response');
const { ERROR_CODES } = require('../config/constants');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Access token required', 401, ERROR_CODES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    
    try {
      decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return sendError(res, 'Token expired', 401, ERROR_CODES.TOKEN_EXPIRED);
      }
      return sendError(res, 'Invalid token', 401, ERROR_CODES.TOKEN_INVALID);
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, role, status')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return sendError(res, 'User not found', 401, ERROR_CODES.UNAUTHORIZED);
    }

    if (user.status === 'deactivated') {
      return sendError(res, 'Account deactivated', 401, ERROR_CODES.UNAUTHORIZED);
    }

    if (user.status === 'suspended') {
      return sendError(res, 'Account suspended', 403, ERROR_CODES.ACCOUNT_SUSPENDED);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401, ERROR_CODES.UNAUTHORIZED);
    }
    
    if (!roles.includes(req.user.role)) {
      return sendError(res, 'Insufficient permissions', 403, ERROR_CODES.FORBIDDEN);
    }
    
    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    
    try {
      decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    } catch {
      req.user = null;
      return next();
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, role, status')
      .eq('id', decoded.id)
      .single();

    if (error || !user || user.status === 'deactivated') {
      req.user = null;
    } else {
      req.user = user;
    }
    
    next();
  } catch {
    req.user = null;
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};
