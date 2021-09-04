const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Published Kuesioner Page
// @route   GET /public
router.get('/', ensureAuth, (req, res) => {
  let navMenus = []
  res.render('public/index', { navTitle: 'Kuesioner Publik', navMenus })
})

module.exports = router