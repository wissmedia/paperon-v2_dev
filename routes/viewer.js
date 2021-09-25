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
    const { body, tipe, idQ, ...jawab } = req.body
    let X = Object.keys(jawab)
    let Y = Object.values(jawab)
    let Z = []
    let objs = []
    let objy = []

    if (tipe.constructor === Array) {
      for (let i = 0; i < tipe.length; i++) {
        if (tipe[i] == 'radioGrid') {
          let obj = {
            idQ: idQ[i],
            body: body[i],
            tipe: tipe[i],
            jawaban: []
          }
          objs.push(obj)

        } else {
          let obj = {
            idQ: idQ[i],
            body: body[i],
            tipe: tipe[i],
            jawaban: jawab[idQ[i]]
          }
          objs.push(obj)
        }
      }
    } else {
      if (tipe == 'radioGrid') {
        let obj = {
          idQ: idQ,
          body: body,
          tipe: tipe,
          jawaban: []
        }
        objs.push(obj)
      } else {
        let obj = {
          idQ: idQ,
          body: body,
          tipe: tipe,
          jawaban: jawab[idQ]
        }
        objs.push(obj)
      }
    }
    // 

    for (let i = 0; i < X.length; i++) {
      Z.push(X[i].split(','))
      Z[i].push(Y[i])
    }
    // 

    for (let i = 0; i < Z.length; i++) {
      let obj = {
        induk: Z[i][0],
        tanya: Z[i][1],
        jawab: Z[i][2],
      }
      objy.push(obj)
    }
    // 

    for (let i = 0; i < objs.length; i++) {
      for (let j = 0; j < objy.length; j++) {
        if (objs[i].idQ == objy[j].induk && objs[i].tipe == 'radioGrid') {
          objs[i].jawaban.push(objy[j])
        }
      }
    }

    // Remove '' from jawaban checkBox
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].tipe == 'checkBox' && objs[i].jawaban.length > 1) {
        objs[i].jawaban.pop()
      }
    }

    console.log(JSON.stringify(objs, null, 2))

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