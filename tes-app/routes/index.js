const express = require('express');
const router = express.Router();
const models = require('../models/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  models.Siswa.findAll({}).then(result => {
    
    res.render('index', {
      title: 'Tess',
      user: req.session.user,
      data: JSON.stringify(result)
    });
  }).catch(err => res.send(err))
});

router.get('/list-siswa', (req, res) => {
  models.Siswa.findAll({}).then(result => {
    res.json(result)
  }).catch(err => res.send(err))
})

router.get('/delete/:id', (req, res) => {
  models.Siswa.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    console.log(`sukses delete data id ${req.params.id}`)
    res.redirect('/home');
  })
})

module.exports = router;
