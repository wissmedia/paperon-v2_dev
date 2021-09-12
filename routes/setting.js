const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Setting Page
// @route   GET /setting
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('setting/index', { navTitle: 'Pengaturan', navMenus })
})

module.exports = router