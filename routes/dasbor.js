const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
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
    { link: '/kuesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/hasil', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/pengaturan', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]
  let menus = [
    { link: '/publik', icon: 'fas fa-comments', label: 'Publik' },
    { link: '/viewer', icon: 'fas fa-eye', label: 'Viewer' },
    { link: '/noschema', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '/noschema', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '/noschema', icon: 'fas fa-bullseye', label: 'Noschema' },
    { link: '/noschema', icon: 'fas fa-bullseye', label: 'Noschema' },
  ]

  try {
    let qform = QForm.countDocuments({ user: req.user._id })
    let question = Question.countDocuments({ user: req.user._id })

    let [a, b] = await Promise.all([qform, question])

    const estimate = {
      qform: a,
      question: b
    }

    res.render('dashboard/index', {
      estimate,
      navTitle: 'Dasbor',
      navMenus,
      menus,
      user: req.user,
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

module.exports = router