const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Author = require('../models/user')

// @desc    Setting Page
// @route   GET /setting
router.get('/', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  let menus = [
    { link: '/pengaturan/akun', icon: 'fas fa-user', label: 'Akun', status: 'pending' },
    { link: '/pengaturan/server', icon: 'fas fa-server', label: 'Server', status: 'pending' },
  ]

  res.render('setting/index', {
    navTitle: 'Pengaturan',
    navMenus,
    menus
  })
})

// @desc    Account Page
// @route   GET /setting/akun
router.get('/akun', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/pengaturan', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  try {
    res.render('setting/account', {
      navTitle: 'Info Akun',
      navMenus,
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Account Edit Page
// @route   GET /setting/akun/edit
router.get('/akun/edit', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/pengaturan', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  try {
    res.render('setting/account-edit', {
      navTitle: 'Edit Akun',
      navMenus,
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Setting Page
// @route   GET /setting/server
router.get('/server', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/pengaturan', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  try {
    res.render('setting/server-detail', {
      navTitle: 'Info Server',
      navMenus,
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
  // let author = Author.estimatedDocumentCount()
  //   let qform = QForm.estimatedDocumentCount()
  //   let question = Question.estimatedDocumentCount()
})

module.exports = router