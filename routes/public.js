const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Qform = require('../models/qform')

// @desc    Publik Kuesioner Page
// @route   GET /public
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    const qforms = await Qform.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()
    res.render('public/index', { qforms, navTitle: 'Kuesioner Publik', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router