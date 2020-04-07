const express = require('express');
const router = express.Router();
const models = require('../models/index');

/* GET landing main page. */
router.get('/', (req, res, next) => {
  res.render('login', { loginMessage: req.flash('loginMessage') });
});

/* POST login and redirect to home page. */
router.post('/login', (req, res) => {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(result => {
    if (result) {
      if (req.body.password === result.dataValues.password) {
        req.session.user = result.dataValues
        res.redirect('/home');
      } else {
        req.flash('loginMessage', 'Password Salah');
        res.redirect('/');
      }
    } else {
      req.flash('loginMessage', 'Username Tidak Ada')
      res.redirect('/')
    }
  }).catch(err => res.send(err));
})

/* GET logout progress */
router.get('/logout', (req, res, next) => {
  req.session.destroy(function (err) {
    return res.redirect('/');
  })
});

module.exports = router;
