const router = require('express').Router();
const { authLimiter } = require('../../middleware/rateLimiter');
const { adminLogin } = require('./admin.auth.controller');

router.post('/authenticate', authLimiter, adminLogin);

module.exports = router;
