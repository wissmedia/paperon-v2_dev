const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Info Page
// @route   GET /info
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/dasbor', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  let Menus = [
    { link: '/cara-penggunaan', icon: 'fas fa-info-circle', label: 'Cara Penggunaan' },
    { link: '/tentang', icon: 'fas fa-info-circle', label: 'Tentang' },
    { link: '/log', icon: 'fas fa-info-circle', label: 'Log' },
  ]
  res.render('info/index', { navTitle: 'Info', navMenus, Menus })
})

// @desc    Log Page
// @route   GET /info/log
router.get('/log', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/info', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('info/change-log', { navTitle: 'Log', navMenus })
})

// @desc    How-To Page
// @route   GET /info/cara-penggunaan
router.get('/cara-penggunaan', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/info', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('info/how-to', { navTitle: 'Cara Penggunaan', navMenus })
})

// @desc    About Page
// @route   GET /info/tentang
router.get('/tentang', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/info', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  res.render('info/about', { navTitle: 'Tentang Aplikasi', navMenus })
})

module.exports = router