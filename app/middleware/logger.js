const { logRequests } = require(`../config`);

async function logger({ method, originalUrl }, next) {

  if (logRequests) {
    const timestamp = new Date().toISOString();
    console.info(`${timestamp}: ${method} ${originalUrl}`);
  }

  await next();

}

module.exports = logger;
