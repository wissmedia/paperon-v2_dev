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
  useWajib: {
    type: String,
    default: '',
    enum: ['on', '']
  },
  useEtc: {
    type: String,
    default: '',
    enum: ['on', '']
  },
  useOpsi: {
    type: String,
    default: '',
    enum: ['on', '']
  },
  opsiy: [
    {
      type: String,
      default: ''
    }
  ],
  opsix: [
    {
      type: String,
      default: ''
    }
  ],
  sl: [Number],
  label: [String]
}, { timestamps: true })

const Question = mongoose.model('question', questionSchema)

module.exports = Question