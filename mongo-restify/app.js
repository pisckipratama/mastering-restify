/* index.js for api server */

// module depedencies
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');

// initialize server
const server = restify.createServer({
  name: config.name,
  version: config.version
})

// middleware
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

// start server, connect to DB & require routes
server.listen(config.port, () => {
  // establish connection to mongodb
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error(err)
    process.exit(1);
  })
  db.once('open', () => {
    require('./routes')(server);
    console.log(`server is listening on port ${config.base_url}`)
  })
})