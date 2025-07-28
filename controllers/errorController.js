const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(400).json({
      status: 'fail',
      message: `A sale point with the same ${field} "${value}" already exists.`,
    });
  }

  const message =
    err.message || 'Something went wrong. Please try again later!';
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
