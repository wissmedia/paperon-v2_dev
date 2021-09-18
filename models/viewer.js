const mongoose = require('mongoose')
const Schema = mongoose.Schema

const responseSchema = new Schema({
  idQ: { type: String },
  body: { type: String },
  tipe: { type: String },
  jawaban: {
    type: String,
    default: ''
  }
}, { _id: false })

const viewerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: [responseSchema]

}, { timestamps: true, strict: false })

const Vx = mongoose.model('viewer', viewerSchema)

module.exports = Vx