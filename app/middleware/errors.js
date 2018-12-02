/**
 * A generic error handler that returns a simple JSON response
 */

const { STATUS_CODES: messages } = require(`http`);

const {
  logAppErrors,
  logUserErrors,
} = require(`../config`);

async function errors(context, next) {

  try {

    await next();

    const { status } = context;
    const message    = messages[status];

    if (status === 404) {

      context.body = {
        message,
        status,
      };

      if (logUserErrors) console.warn(JSON.stringify(context.body, null, 2));

    }

  } catch (e) {

    const status = e.statusCode || e.status || 500;

    context.status = status;

    context.body = {
      message: e.message || messages[status],
      status,
    };

    if ((400 <= status < 500) && logUserErrors) console.error(e);
    if ((500 <= status) && logAppErrors) console.error(e);

  }

}

module.exports = errors;
