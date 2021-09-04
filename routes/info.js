const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Info Page
// @route   GET /info

router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('info/index', { navTitle: 'Info', navMenus })
})


// @desc    Change Log Page
// @route   GET /info/log

router.get('/log', ensureAuth, (req, res) => {
  res.render('info/change-log', { navTitle: 'Log', })
})

module.exports = router