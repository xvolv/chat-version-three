const devError = (res, error) => {
  res.status(error.statusCode || 500).json({
    status: "FAIL",
    message: error.message, // No need for default here
    stack: error.stack,
    error: error,
  });
};

const prodError = (res, error) => {
  res.status(error.statusCode || 500).json({
    status: "FAIL",
    message: error.message, // No need for default here either
  });
};

const globalErrorHandler = (error, req, res, next) => {
  // Set defaults once
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Something went wrong";
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
   
    devError(res, error);
  } else {

    devError(res, error);
  }
};

module.exports = globalErrorHandler;
