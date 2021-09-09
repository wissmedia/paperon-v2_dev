const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')

// @desc    Viewer Page
// @route   GET /
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  try {
    const questions = await Question.find({ user: req.user.id }).lean()
    res.render('viewer/index', { questions, navTitle: 'Viewer', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router