const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const NOX = require('../models/noSchema')
const Question = require('../models/question')

// @desc    NoSchema Page
// @route   GET /noschema
router.get('/', ensureAuth, async (req, res) => {
  const noschemas = await NOX.find().lean()
  res.render('noschema/index', { noschemas })
})

// @desc    NoSchema Add Page
// @route   GET /noschema/add
router.get('/add', ensureAuth, async (req, res) => {
  const questions = await Question.find({ user: req.user.id }).lean()
  res.render('noschema/add', { questions })
})

// @desc    Handle POST NoSchema
// @route   POST /noschema
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const noschema = new NOX(req.body)
    await noschema.save()
    res.redirect('/noschema')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router