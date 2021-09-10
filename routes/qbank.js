const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')

// @desc    Show List Pertanyaan Page
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
    res.render('qbank/index', {
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
    { value: 'shortText', text: 'Teks Jawaban Pendek' },
    { value: 'longText', text: 'Teks Jawaban Panjang' },
    { value: 'radio', text: 'Pilihan dengan 1 Jawaban' },
    { value: 'checkBox', text: 'Pilihan dengan Banyak Jawaban' },
    { value: 'dropDown', text: 'Menu Turun dengan 1 Jawaban' },
  ]
  res.render('qbank/add', { options, navTitle: 'Tambah Pertanyaan', navMenus })
})

// @desc    DELETE Pertanyaan
// @route   DELETE /pertanyaan/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Question.remove({ _id: req.params.id })
    res.redirect('/pertanyaan')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router