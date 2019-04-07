const { name: project } = require(`../package.json`);
const { env, port }     = require(`../config`);

function startServer(app) {
  app.listen(port, () => console.info(`Server started. Press Ctrl+C to terminate.
    Project: ${project}
    Port:    ${port}
    Time:    ${new Date}
    Node:    ${process.version}
    Env:     ${env}`));
}

module.exports = startServer;
