const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Show All Pertanyaan
// @route   GET /pertanyaan
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/pertanyaan/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  res.render('qbank/index', { navTitle: 'List Pertanyaan', navMenus })
})

module.exports = router