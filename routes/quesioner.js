const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/kuesioner/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  res.render('quesioner/index', { navTitle: 'List Kuesioner', navMenus })
})

// @desc    Get Tambah Kuesioner Page
// @route   GET /kuesioner/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  res.render('quesioner/add', { navTitle: 'Buat Kuesioner Baru', navMenus })
})

module.exports = router