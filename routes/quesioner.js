const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureAuth, (req, res) => {
  let navMenus = []
  res.render('quesioner/index', { navTitle: 'List Kuesioner', navMenus })
})

module.exports = router