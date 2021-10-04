const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const QForm = require('../models/qform')
const Question = require('../models/question')

// @desc    List Kuesioner Page
// @route   GET /kuesioner
router.get('/', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
    { link: '/kuesioner/tambah', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  try {
    const qforms = await QForm.find({ user: req.user.id }).lean()
    res.render('qform/index', { qforms, navTitle: 'List Kuesioner', navMenus })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 1 - Tambah Kuesioner Page
// @route   POST /kuesioner
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const qform = new QForm(req.body)
    let id = qform._id
    await qform.save()
    res.redirect(`/kuesioner/tambah/${id}/pilih`)
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 1 - Tambah Kuesioner Page
// @route   GET /kuesioner/tambah
router.get('/tambah', ensureAuth, (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  res.render('qform/add', { navTitle: '(1) Buat Kuesioner', navMenus })
})

// @desc    Step 2 - Pilih Pertanyaan Page
// @route   PUT /kuesioner/pilih
router.put('/pilih', ensureAuth, async (req, res) => {
  // remove blank element from idQ array
  if (req.body.hasOwnProperty('idQ')) {
    if (req.body.idQ.constructor === Array) {
      req.body.idQ = req.body.idQ.filter(item => item)
    }
  }

  try {
    let { idF, idQ } = req.body
    let objs = []

    if (idQ.constructor === Array) {
      for (let i = 0; i < idQ.length; i++) {
        let obj = {
          idQ: idQ[i],
          order: null
        }
        objs.push(obj)
      }
    }
    req.body.listQ = objs
    let qform = await QForm.findById(idF).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/pertanyaan')
    } else {
      qform = await QForm.findOneAndUpdate({ _id: req.body.idF }, req.body, {
        runValidators: true
      })
      res.redirect(`/kuesioner/tambah/${idF}/urutan`)
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 2 - Pilih Pertanyaan Page
// @route   GET /kuesioner/:id/pilih
router.get('/tambah/:id/pilih', ensureAuth, async (req, res) => {
  try {
    let idNext = req.params.id
    let a = Question.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()
    let b = QForm.findById(req.params.id).lean()

    let [questions, qform] = await Promise.all([a, b])

    res.render('qform/select', {
      navTitle: '(2) Tambah Pertanyaan',
      idNext,
      questions,
      qform,
      helper: require('../helper/helper'),
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 3 - Urutkan Pertanyaan Page
// @route   PUT /kuesioner/urutan
router.put('/urutan', ensureAuth, async (req, res) => {
  try {
    // console.log(req.body)

    let { idF, idQ, order } = req.body
    // console.log(idF)
    // console.log(idQ)
    // console.log(order)

    let objs = []
    for (let i = 0; i < idQ.length; i++) {
      let obj = {
        idQ: idQ[i],
        order: order[i]
      }
      objs.push(obj)
    }
    console.log(objs)
    req.body.listQ = objs
    let qform = await QForm.findById(idF).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/pertanyaan')
    } else {
      qform = await QForm.findOneAndUpdate({ _id: req.body.idF }, req.body, {
        runValidators: true
      })

      // res.redirect(`/kuesioner/tambah/${idF}/urutan`)
      res.redirect(`/kuesioner/tambah/${idF}/publikasi`)
    }


  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 3 - Urutkan Pertanyaan Page
// @route   GET /kuesioner/urutan
router.get('/tambah/:id/urutan', ensureAuth, async (req, res) => {
  let idNext = req.params.id
  try {
    let qforms = await QForm.findById(req.params.id).populate('listQ.idQ').lean()
    res.render('qform/queue', {
      navTitle: '(3) Urutkan Pertanyaan',
      idNext,
      qforms,
      helper: require('../helper/helper'),
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 4 - Publikasi Kuesioner Page
// @route   POST /kuesioner/publikasi
router.post('/publikasi', ensureAuth, async (req, res) => {
  try {
    // req.body.user = req.user.id
    // const qform = new QForm(req.body)
    // await qform.save()
    // res.redirect('/kuesioner/pilih')
    res.redirect('/kuesioner')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Step 4 - Publikasi Kuesioner Page
// @route   GET /kuesioner/publikasi
router.get('/tambah/:id/publikasi', ensureAuth, (req, res) => {
  try {
    let idNext = req.params.id
    // res.type('json').send(JSON.stringify(qforms, null, 2) + '\n')
    res.render('qform/publish', {
      navTitle: '(4) Publikasi Kuesioner',
      idNext
    })
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Show single kuesioner page
// @route   GET /kuesioner/:id
router.get('/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/kuesioner', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    let qform = await QForm.findById(req.params.id)
      .lean()
    if (!qform) {
      return res.render('error/404')
    }
    res.render('qform/detail', {
      qform,
      helper: require('../helper/helper'),
      navTitle: 'Detail Kuesioner',
      navMenus
    })
  } catch (error) {
    console.error(error)
    return res.render('error/404')
  }
})

// @desc    Edit Kuesioner Page
// @route   GET /kuesioner/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  let navMenus = [
    { link: '/kuesioner', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  try {
    const qform = await QForm.findOne({
      _id: req.params.id
    }).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/kuesioner')
    } else {
      res.render('qform/edit', {
        qform,
        helper: require('../helper/helper'),
        navTitle: 'Edit Kuesioner',
        navMenus
      })
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    Update Kuesioner
// @route   PUT /kuesioner/:id
router.put('/:id', ensureAuth, async (req, res) => {
  let id = req.params.id
  console.log(req.body)
  try {
    let qform = await QForm.findById(id).lean()
    if (!qform) {
      return res.render('error/404')
    }
    if (qform.user != req.user.id) {
      res.redirect('/kuesioner')
    } else {
      qform = await QForm.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true
      })
      res.redirect(`/kuesioner/${id}`)
    }
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

// @desc    DELETE Pertanyaan
// @route   DELETE /pertanyaan/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Question.deleteOne({ _id: req.params.id })
    res.redirect('/pertanyaan')
  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
})

module.exports = router