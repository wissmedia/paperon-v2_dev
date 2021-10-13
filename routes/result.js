const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const QForm = require('../models/qform')

// @desc    Hasil Page
// @route   GET /hasil
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('result/index', { navTitle: 'Hasil', navMenus })
})

module.exports = router