const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quesFormSchema = new Schema({
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

const QuesForm = mongoose.model('ques-form', quesFormSchema)

module.exports = QuesForm