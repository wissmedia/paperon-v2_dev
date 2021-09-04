const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureAuth, (req, res) => {
  let navMenus = []
  res.render('result/index', { navTitle: 'Hasil', navMenus })
})

module.exports = router