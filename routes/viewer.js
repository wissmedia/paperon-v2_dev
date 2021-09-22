const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Question = require('../models/question')
const NOX = require('../models/noSchema')
const Vx = require('../models/viewer')

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
    let objs = []
    const { body, tipe, idQ, ...jawab } = req.body
    console.log(req.body)
    console.log(body)
    console.log(tipe)
    console.log(idQ)
    console.log(jawab)
    let objx = Object.keys(jawab).length
    console.log(objx)
    const newArr = Object.entries(jawab);
    // console.log(newArr[0])
    // console.log(newArr[0][0])

    for (let i = 0; i < objx; i++) {
      let obj = {
        idQ: idQ,
        body: body,
        tipe: tipe,
        jawaban: jawab
      }
      objs.push(obj)
    }
    console.log(objs)

    // await new Vx({
    //   user: req.user.id,
    //   response: objs
    // }).save()
    res.redirect('/viewer')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Viewer Data Page
// @route   GET /viewer/data
router.get('/data', ensureAuth, async (req, res) => {
  try {
    const vx = await Vx.find().lean()

    res.type('json').send(JSON.stringify(vx, null, 2) + '\n')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router