const bcrypt = require('bcryptjs');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = async (otp) => {
  return bcrypt.hash(otp, 10);
};

const verifyOtp = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

module.exports = {
  generateOtp,
  hashOtp,
  verifyOtp
};
