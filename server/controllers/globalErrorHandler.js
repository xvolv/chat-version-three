const devError = (res, error) => {
  res.status(error.statusCode || 500).json({
    status: "FAIL",
    message: error.message, // No need for default here
    stack: error.stack,
    error: error,
  });
};


const globalErrorHandler = (error, req, res, next) => {
  // Set defaults once
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    devError(res, error);
  } else {
    devError(res, error);
  }
};

module.exports = globalErrorHandler;
