const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listQSchema = new Schema({
  idQ: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  },
  order: {
    type: Number,
    default: null
  }
}, { _id: false })

const qFormSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  judul: {
    type: String,
    required: true,
    trim: true,
  },
  subjudul: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    default: 'private',
    enum: ['public', 'private']
  },
  listQ: [listQSchema]
}, { timestamps: true })

const QForm = mongoose.model('QForm', qFormSchema)

module.exports = QForm