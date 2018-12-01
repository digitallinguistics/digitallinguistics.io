/**
 * A generic error handler that returns a simple JSON response
 */

const { STATUS_CODES: messages } = require(`http`);

module.exports = async (context, next) => {

  try {

    await next();

    const { status } = context;
    const message    = messages[status];

    if (status === 404) {
      context.body = {
        message,
        status,
      };
    }

  } catch (e) {

    const status = e.statusCode || e.status || 500;

    context.status = status;

    context.body = {
      message: e.message || messages[status],
      status,
    };

  }

};
