const normalizePhone = (phone) => {
  const cleaned = phone.replace(/[\s\-]/g, '');
  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('237')) {
      return '+' + cleaned;
    }
    return '+237' + cleaned;
  }
  return cleaned;
};

const isPhone = (identifier) => {
  return /^\+237[0-9]{9}$/.test(identifier);
};

const isEmail = (identifier) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
};

const maskPhone = (phone) => {
  if (!phone || phone.length < 6) return phone;
  return phone.slice(0, -6) + '***' + phone.slice(-3);
};

const maskEmail = (email) => {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  const maskedLocal = local.charAt(0) + '***' + local.charAt(local.length - 1);
  return maskedLocal + '@' + domain;
};

const shouldAdvanceToActive = (user) => {
  return (
    (user.role === 'local_buyer' || user.role === 'international_buyer') &&
    user.phone_verified &&
    user.email_verified
  );
};

const shouldAdvanceToPendingReview = (user) => {
  return user.role === 'farmer' && user.phone_verified && user.email_verified;
};

const sanitizeUser = (user) => {
  const { password_hash, ...sanitized } = user;
  return sanitized;
};

module.exports = {
  normalizePhone,
  isPhone,
  isEmail,
  maskPhone,
  maskEmail,
  shouldAdvanceToActive,
  shouldAdvanceToPendingReview,
  sanitizeUser
};
