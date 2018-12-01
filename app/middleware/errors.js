/**
 * A generic error handler that returns a simple JSON response
 */

module.exports = async (context, next) => {

  try {

    await next();

  } catch (e) {

    const status = e.statusCode || e.status || 500;

    context.status = status;

    context.body = {
      message: e.message,
      status,
    };

  }

};
