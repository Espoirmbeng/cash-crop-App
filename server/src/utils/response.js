const sendSuccess = (res, data, message, statusCode = 200, meta = null) => {
  const response = {
    success: true,
    message,
    data
  };
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
};

const sendError = (res, message, statusCode = 500, errorCode, details = null) => {
  const response = {
    success: false,
    message,
    error: { code: errorCode }
  };
  if (details) response.error.details = details;
  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
