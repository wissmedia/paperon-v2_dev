const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tipe: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  wajib: {
    type: String,
    default:'',
    enum: ['on', '']
  },
  etc: {
    type: String,
    default:'',
    enum: ['on', '']
  },
  opsi: [
    {
      type: String,
      default: ''
    }
  ]
}, { timestamps: true })

const Question = mongoose.model('question', questionSchema)

module.exports = Question