const { logRequests } = require(`../config`);

async function logger(context, next) {

  const { method, originalUrl } = context;

  if (logRequests) {
    const timestamp = new Date().toISOString();
    console.info(`${timestamp}: ${method} ${originalUrl}`);
  }

  await next();

}

module.exports = logger;
