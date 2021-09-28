const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')

// @desc    List Pertanyaan Page
// @route   GET /pertanyaan
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/pertanyaan/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  try {
    const questions = await Question.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()
    res.render('qbank/index-new', {
      navTitle: 'List Pertanyaan',
      helper: require('../helper/helper'),
      questions,
      navMenus
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Process tambah pertanyaan
// @route   POST /pertanyaan
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    // console.log(req.body)
    const question = new Question(req.body)
    await question.save()
    res.redirect('/pertanyaan')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Tambah Pertanyaan Page
// @route   GET /pertanyaan/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/pertanyaan', icon: 'fas fa-chevron-circle-left', label: 'Kembali', id: 'kembali' },
    { link: 'javascript:;', icon: 'fas fa-plus', label: 'Pilihan', id: 'add' },
  ]
  res.render('qbank/add-new', { navTitle: 'Tambah Pertanyaan', navMenus })
})

// @desc    Show single question page
// @route   GET /pertanyaan/:id
router.get('/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/pertanyaan', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    let question = await Question.findById(req.params.id)
      .lean()
    if (!question) {
      return res.render('error/404')
    }
    res.render('qbank/detail', {
      question,
      helper: require('../helper/helper'),
      navTitle: 'Detail Pertanyaan',
      navMenus
    })
  } catch (error) {
    console.error(error)
    return res.render('error/404')
  }
})

// @desc    Edit Pertanyaan Page
// @route   GET /pertanyaan/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/pertanyaan', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    const question = await Question.findOne({
      _id: req.params.id
    }).lean()
    if (!question) {
      return res.render('error/404')
    }
    if (question.user != req.user.id) {
      res.redirect('/pertanyaan')
    } else {
      res.render('qbank/edit', {
        question,
        helper: require('../helper/helper'),
        navTitle: 'Edit Pertanyaan',
        navMenus
      })
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Update Pertanyaan
// @route   PUT /pertanyaan/:id
router.put('/:id', ensureAuth, async (req, res) => {
  let id = req.params.id
  // handle if useWajib not checked
  if (!(req.body.hasOwnProperty('useWajib'))) {
    req.body.useWajib = ''
  }
  // console.log('BEFORE')
  // console.log(req.body)

  // remove blank element from opsiy array
  // this code can be difficult to use because not checking tipe first
  if (req.body.hasOwnProperty('opsiy')) {
    if (req.body.opsiy.constructor === Array) {
      req.body.opsiy = req.body.opsiy.filter(item => item)
    }
  }
  // remove blank element from opsix array
  if (req.body.hasOwnProperty('opsix')) {
    if (req.body.opsix.constructor === Array) {
      req.body.opsix = req.body.opsix.filter(item => item)
    }
  }

  // console.log('AFTER')
  // console.log(req.body)

  try {
    let question = await Question.findById(id).lean()
    if (!question) {
      return res.render('error/404')
    }
    if (question.user != req.user.id) {
      res.redirect('/pertanyaan')
    } else {
      question = await Question.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true
      })
      res.redirect(`/pertanyaan/${id}`)
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