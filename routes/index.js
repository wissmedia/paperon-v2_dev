const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('index')
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dasbor', ensureAuth, async (req, res) => {

  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard/index', {
      user: req.user,
      // stories
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router