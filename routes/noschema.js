const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const NOX = require('../models/noSchema')
const Question = require('../models/question')

// @desc    NoSchema Page
// @route   GET /noschema
router.get('/', ensureAuth, async (req, res) => {
  try {
    const noschemas = await NOX.find().lean()
  // res.render('noschema/index', { noschemas })
  res.type('json').send(JSON.stringify(noschemas, null, 2) + '\n')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    NoSchema Add Page
// @route   GET /noschema/add
router.get('/add', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    const questions = await Question.find({ user: req.user.id }).lean()
    res.render('noschema/add', { questions, navTitle: 'NoSchema Page', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Handle POST NoSchema
// @route   POST /noschema
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { bodyText, answerText } = req.body
    let objs = []
    for (let i = 0; i < bodyText.length; i++) {
      obj = {
        bodyText: bodyText[i],
        answerText: answerText[i]
      }
      objs.push(obj)
    }
    await new NOX({
      user: req.user.id,
      forms: objs
    }).save()
    res.redirect('/noschema')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router