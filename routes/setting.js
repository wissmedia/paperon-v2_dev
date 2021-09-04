const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureAuth, (req, res) => {
  let navMenus = []
  res.render('setting/index', { navTitle: 'Pengaturan', navMenus })
})

module.exports = router