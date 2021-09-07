const mongoose = require('mongoose')
const Schema = mongoose.Schema

const qFormSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
}, { timestamps: true })

const QForm = mongoose.model('ques-form', qFormSchema)

module.exports = QForm