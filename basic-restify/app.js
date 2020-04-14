var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

server.pre(restify.plugins.pre.userAgentConnection());

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/', function (req, res, next) {
  res.send('home');
  return next();
})

server.post('/foo',
  function (req, res, next) {
    req.someData = 'foo';
    return next();
  },
  function (req, res, next) {
    res.send(req.someData);
    return next();
  }
)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
})