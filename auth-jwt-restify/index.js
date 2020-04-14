const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middlewares
server.use(restify.plugins.bodyParser());

// protect route
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/users/auth'] }));

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('db connected'))
    .catch(err => console.err(err));
});

const db = mongoose.connection;

db.on('error', (err) => console.error(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log(`Server start on ${config.URL}`);
})