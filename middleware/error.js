export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const asyncError = (passedFunc) => {
  return async (req, res) => {
    try {
      await passedFunc(req, res);
    } catch (err) {
      console.error("Caught Async Error:", err);
      console.error(err.stack); // Log the stack trace for more information
      return errorHandler(res, 500, err.message);
    }
  };
};
