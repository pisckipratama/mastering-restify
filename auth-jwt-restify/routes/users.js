const errors = require('restify-errors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
  server.post('/users/register', (req, res, next) => {

    const { email, password, retypepassword } = req.body;

    if (password !== retypepassword) {
      return next(new errors.InvalidContentError("Password doesn't match!"));
    } else {
      const newUser = new User({ email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) res.send(err);
          newUser.password = hash;
          try {
            const listUsers = await User.findOne({ email })
            if (listUsers) {
              return next(new errors.InvalidContentError("User already exist!"));
            } else {
              const addUser = await newUser.save();
              res.send(201, addUser);
              next();
            }
          } catch (err) {
            return next(new errors.InvalidContentError("expect 'application/json'"));
          };
        });
      });
    };
  });

  // auth user 
  server.post('/users/auth', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });

      const { iat, exp } = jwt.decode(token);
      res.send({ iat, exp, token });
      next();
    } catch (err) {
      // user unauthorize
      return next(new errors.UnauthorizedError(err));
    }
  })
};