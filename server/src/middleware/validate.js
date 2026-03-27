const { sendError } = require('../utils/response');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const details = error.details.map(d => ({
      field: d.path.join('.'),
      message: d.message.replace(/['"]/g, '')
    }));
    return sendError(res, 'Validation failed', 400, 'VALIDATION_ERROR', details);
  }
  next();
};

module.exports = validate;
