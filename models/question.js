const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  selectType: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true })

const Question = mongoose.model('question', questionSchema)

module.exports = Question