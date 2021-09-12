const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Author = require('../models/user')
const QForm = require('../models/qform')

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
    { link: '/kuesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/hasil', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/pengaturan', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]

  try {
    let author = Author.estimatedDocumentCount()
    let qform = QForm.estimatedDocumentCount()

    let [a, b] = await Promise.all([author, qform])

    const estimate = {
      author: a,
      qform: b
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