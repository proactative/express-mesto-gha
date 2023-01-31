const { INTERNAL_SERVER_ERROR } = require('../utils/error-constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR // 500
        ? 'Ошибка сервера123.'
        : message,
    });
  next();
};
