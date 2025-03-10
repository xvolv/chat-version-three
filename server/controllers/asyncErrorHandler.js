const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      next(error);
    });
  };
};

module.exports = asyncErrorHandler;
