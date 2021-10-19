const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const { ensureAPIAuth } = require('../middleware/api')
const Question = require('../models/question')

// @desc    List Pertanyaan Page
// @route   GET /pertanyaan
router.get('/qbank', ensureAPIAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/pertanyaan/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  try {
    const questions = await Question.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()
    res.json(questions)
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router