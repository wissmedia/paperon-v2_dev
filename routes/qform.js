const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const QForm = require('../models/qform')

// @desc    List Kuesioner Page
// @route   GET /kuesioner
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/kuesioner/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  try {
    const qforms = await QForm.find({ user: req.user.id }).lean()
    res.render('qform/index', { qforms, navTitle: 'List Kuesioner', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Process add kuesioner
// @route   POST /kuesioner
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const qform = new QForm(req.body)
    await qform.save()
    res.redirect('/kuesioner')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Tambah Kuesioner Page
// @route   GET /kuesioner/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  res.render('qform/add', { navTitle: 'Buat Kuesioner Baru', navMenus })
})

module.exports = router