const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Customer = require('../models/Customers');
const config = require('../config');

module.exports = server => {

  /** GET ALL DATA */
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next(); // Don't forget to declare this function in end
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  /* GET Single Customer */
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
      }
      res.send(customer);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  /** POST ADD DATA */
  server.post('/customers', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("expect 'application/json'"));
    }

    const { name, email, balance } = req.body;
    const customer = new Customer({ name, email, balance });

    try {
      const newUser = await customer.save();
      res.send(201, newUser);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  /** PUT EDIT DATA */
  server.put('/customers/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("expect 'application/json'"));
    };

    try {
      const user = await Customer.updateOne({ _id: req.params.id }, req.body);
      if (!user) return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  })

  server.del('/customers/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    try {
      const user = await Customer.deleteOne({ _id: req.params.id });
      if (!user) return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
      res.send(204);
      next();
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });
};