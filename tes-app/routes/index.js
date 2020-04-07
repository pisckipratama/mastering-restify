const express = require('express');
const router = express.Router();
const models = require('../models/index');
const helper = require('../helpers/utils')

/* GET data siswa and sekolah */
router.get('/', helper.isLoggedIn, (req, res) => {
  models.Sekolah.findAll({})
    .then(result => {
      dataSekolah = result
      return models.Siswa.findAll({
        include: [{
          model: models.Sekolah
        }]
      }).then(result => {
        dataSiswa = result
        res.render('index', {
          title: 'Tess',
          user: req.session.user,
          sekolahan: JSON.stringify(dataSekolah),
          data: JSON.stringify(dataSiswa)
        })
      })
    }).catch(err => res.send(err))
})

/* GET landing page for edit */
router.get('/edit/:id', helper.isLoggedIn, (req, res) => {
  models.Sekolah.findAll({})
    .then(result => {
      dataSekolah = result
      return models.Siswa.findAll({
        include: [{
          model: models.Sekolah
        }],
        where: {
          id: req.params.id
        }
      }).then(result => {
        dataSiswa = result
        res.render('edit', {
          title: 'Tess',
          user: req.session.user,
          sekolahan: JSON.stringify(dataSekolah),
          data: JSON.stringify(dataSiswa)
        })
      })
    }).catch(err => res.send(err))
})

/* POST add data siswa */
router.post('/add', helper.isLoggedIn, (req, res) => {
  models.Siswa.create({
    nama: req.body.nama,
    alamat: req.body.alamat,
    notelp: req.body.telp,
    SekolahId: req.body.sekolah
  }).then(() => {
    console.log(`sucess record data at ${new Date}`)
    res.redirect('/home')
  }).catch(err => res.send(err))
})

/* POST edit data siswa */
router.post('/edit/:id', helper.isLoggedIn, (req, res) => {
  models.Siswa.update({
    nama: req.body.nama,
    alamat: req.body.alamat,
    notelp: req.body.telp,
    SekolahId: req.body.sekolah
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => res.redirect('/home'))
    .catch(err => res.send(err))
})

/* POST add data sekolah */
router.post('/add-school', helper.isLoggedIn, (req, res) => {
  models.Sekolah.create({
    nama: req.body.inputsekolah
  }).then(() => {
    console.log(`success record data school at ${new Date}`)
    res.redirect('/home')
  }).catch(err => res.send(err))
})

/* DELETE delete data siswa */
router.get('/delete/:id', helper.isLoggedIn, (req, res) => {
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
