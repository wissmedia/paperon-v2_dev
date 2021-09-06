const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')

// @desc    Show All Pertanyaan
// @route   GET /pertanyaan
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/pertanyaan/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  try {
    const questions = await Question.find({ user: req.user.id }).lean()
    res.render('qbank/index', { questions, navTitle: 'List Pertanyaan', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Process add pertanyaan
// @route   POST /pertanyaan
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const question = new Question(req.body)
    await question.save()
    res.redirect('/pertanyaan')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Get Tambah Pertanyaan Page
// @route   GET /pertanyaan/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  let options = [
    { value: 'shortText', text: 'Jawaban Pendek' },
    { value: 'longText', text: 'Jawaban Panjang' },
  ]
  res.render('qbank/add', { options, navTitle: 'Tambah Pertanyaan', navMenus })
})

module.exports = router