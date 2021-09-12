const mongoose = require('mongoose')
const Schema = mongoose.Schema

const qFormSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String
  },
  status: {
    type: String,
    default: 'private',
    enum: ['public', 'private']
  }
}, { timestamps: true })

const QForm = mongoose.model('qform', qFormSchema)

module.exports = QForm