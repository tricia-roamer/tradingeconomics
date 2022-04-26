const { APP_ENV } = process.env;

const sendError = (res, status, err) => {
  console.log('Caught Error', err);
  const { message, stack } = err;
  res.status(status).json({
    status,
    message: APP_ENV !== 'production' ? message : 'internal error',
    stack: APP_ENV !== 'production' ? stack : undefined,
  });
};

exports.sendError = sendError;

exports.catchErrors = fn => (req, res, next) => fn(req, res, next)
  .catch(err => sendError(res, 500, err));
