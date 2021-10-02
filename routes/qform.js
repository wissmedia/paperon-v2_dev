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

// @desc    Step 1 - Tambah Kuesioner Page
// @route   POST /kuesioner
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const qform = new QForm(req.body)
    await qform.save()
    res.redirect('/kuesioner/pilih')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 1 - Tambah Kuesioner Page
// @route   GET /kuesioner/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  res.render('qform/add', { navTitle: '(1) Buat Kuesioner', navMenus })
})

// @desc    Step 2 - Pilih Pertanyaan Page
// @route   GET /kuesioner/pilih
router.get('/pilih', ensureAuth, (req, res) => {
  res.render('qform/select', { navTitle: '(2) Tambah Pertanyaan'})
})

// @desc    Show single kuesioner page
// @route   GET /kuesioner/:id
router.get('/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/kuesioner', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    let qform = await QForm.findById(req.params.id)
      .lean()
    if (!qform) {
      return res.render('error/404')
    }
    res.render('qform/detail', {
      qform,
      helper: require('../helper/helper'),
      navTitle: 'Detail Kuesioner',
      navMenus
    })
  } catch (error) {
    console.error(error)
    return res.render('error/404')
  }
})

// @desc    Edit Kuesioner Page
// @route   GET /kuesioner/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/kuesioner', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    const qform = await QForm.findOne({
      _id: req.params.id
    }).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/kuesioner')
    } else {
      res.render('qform/edit', {
        qform,
        helper: require('../helper/helper'),
        navTitle: 'Edit Kuesioner',
        navMenus
      })
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Update Kuesioner
// @route   PUT /kuesioner/:id
router.put('/:id', ensureAuth, async (req, res) => {
  let id = req.params.id
  console.log(req.body)
  try {
    let qform = await QForm.findById(id).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/kuesioner')
    } else {
      qform = await QForm.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true
      })
      res.redirect(`/kuesioner/${id}`)
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    DELETE Pertanyaan
// @route   DELETE /pertanyaan/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Question.deleteOne({ _id: req.params.id })
    res.redirect('/pertanyaan')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router