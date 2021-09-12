const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
}, { timestamps: true, strict: false })

const NOX = mongoose.model('noschema', noSchema)

module.exports = NOX