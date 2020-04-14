const restify = require('restify');
const errors = require('restify-errors');

const port = 3000;
const controller = require('./controller/products.controller');

const server = restify.createServer({
  name: "restify learn"
})

server.pre(restify.plugins.bodyParser());

server.pre((req, res, next) => {
  console.info(`${req.method} - ${req.url}`);
  return next();
})

server.get('/api/products', (req, res, next) => {
  res.send(200, controller.getAll());
  return next();
});

server.get('/api/products/:id', (req, res, next) => {
  if (!req.params.id) {
    return next(new errors.BadRequestError());
  }
  try {
    const product = controller.getById(+req.params.id);
    res.send(200, product);
  } catch (err) {
    return next(new errors.NotFoundError(err));
  }
});

server.post('/api/products', (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.id) {
    return next(new errors.BadRequestError());
  }
  controller.create(+req.body.id, req.body.name);
  res.send(201);
  return next();
});

server.put('/api/products/:id', (req, res, next) => {
  if (!req.params.id || !req.body || !req.body.name) {
    return next(new errors.BadRequestError());
  }
  try {
    const product = controller.update(+req.params.id, req.body.name);
    res.send(200, product);
    return next();
  } catch (err) {
    return next(new errors.NotFoundError(err));
  }
});

server.del('/api/products/:id', (req, res, next) => {
  if (!req.params.id) {
    return next(new errors.BadRequestError());
  }
  try {
    controller.del(+req.params.id);
    res.send(204);
    return next();
  } catch (err) {
    return next(new errors.NotFoundError(err));
  }
});

server.listen(port, () => console.info(`API running on port ${port}`));