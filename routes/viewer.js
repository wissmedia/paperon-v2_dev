const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')
const NOX = require('../models/noSchema')

// @desc    Viewer Page
// @route   GET /viewer
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' }
  ]
  try {
    const questions = await Question.find({ user: req.user.id }).lean()
    res.render('viewer/index', {
      questions,
      helper: require('../helper/helper'),
      navTitle: 'Viewer',
      navMenus
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Process Viewer Page
// @route   POST /viewer
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { body, tipe, jawaban } = req.body
    let objs = []
    for (let i = 0; i < body.length; i++) {
      obj = {
        body: body[i],
        tipe: tipe[i],
        jawaban: jawaban[i],
      }
      objs.push(obj)
    }
    let objx = {
      user: req.user.id,
      response: objs
    }
    console.log(objx)

    // await new NOX({
    //   user: req.user.id,
    //   response: objs
    // }).save()
    res.redirect('/viewer')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router