const defaultError = {
  statusCode: 500,
  message: 'Internal Server Error',
};

class ErrorHandler extends Error {
  constructor(
    statusCode = defaultError.statusCode,
    message = defaultError.message,
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = ({
  statusCode = defaultError.message,
  message = defaultError.statusCode,
} = defaultError, res) => {
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = {
  defaultError,
  ErrorHandler,
  handleError,
};
