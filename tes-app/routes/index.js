const express = require('express');
const router = express.Router();
const models = require('../models/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  models.Siswa.findAll({}).then(result => {
    console.log(result)
    res.render('index', {
      title: 'Tess',
      user: req.session.user,
      data: result[0].dataValues
    });
  }).catch(err => res.send(err))
});

module.exports = router;
