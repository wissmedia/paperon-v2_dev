const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('index', { navTitle: 'Beranda' })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dasbor', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/pertanyaan', icon: 'fas fa-warehouse', label: 'Pertanyaan' },
    { link: '/kuesioner', icon: 'fas fa-newspaper', label: 'Kuesioner' },
    { link: '/hasil', icon: 'fas fa-poll', label: 'Hasil' },
    { link: '/pengaturan', icon: 'fas fa-cogs', label: 'Pengaturan' },
  ]

  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard/index', {
      navTitle: 'Dasbor',
      navMenus,
      user: req.user,
      // stories
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router