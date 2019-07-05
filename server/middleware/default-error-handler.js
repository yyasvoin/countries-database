'use strict';

/**
 * Default error handling middleware.
 * @see https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
 */
module.exports = function deafultErrorHandler(error, req, res, next) {
  console.error(error);
  if (res.headersSend) next(error);
  else {
    res
      .status(500)
      .json({ error: error.message });
  }
};
