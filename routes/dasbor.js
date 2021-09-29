const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Author = require('../models/user')
const QForm = require('../models/qform')
const Question = require('../models/question')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('index', { navTitle: 'Beranda' })
})

// @desc    Dashboard Page
// @route   GET /dashboard
router.get('/dasbor', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/pertanyaan', icon: 'fas fa-warehouse', label: 'Pertanyaan' },
    { link: '/kuesioner', icon: 'fas fa-newspaper', label: 'Kuesioner'},
    { link: '/hasil', icon: 'fas fa-poll', label: 'Hasil', status:'pending'},
    { link: '/pengaturan', icon: 'fas fa-cogs', label: 'Pengaturan', status:'pending'},
  ]

  try {
    let author = Author.estimatedDocumentCount()
    let qform = QForm.estimatedDocumentCount()
    let question = Question.estimatedDocumentCount()

    let [a, b, c] = await Promise.all([author, qform, question])

    const estimate = {
      author: a,
      qform: b,
      question: c
    }

    res.render('dashboard/index', {
      estimate,
      navTitle: 'Dasbor',
      navMenus,
      user: req.user,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

module.exports = router