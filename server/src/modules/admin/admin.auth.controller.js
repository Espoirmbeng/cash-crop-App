const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../utils/response');
const adminAuthService = require('./admin.auth.service');

const adminLogin = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  const adminKey = req.headers['x-admin-key'];
  const result = await adminAuthService.adminLogin(identifier, password, adminKey, req);
  sendSuccess(res, result, 'Admin login successful');
});

module.exports = {
  adminLogin
};
