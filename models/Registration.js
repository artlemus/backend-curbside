const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegistrationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Registration = mongoose.model('registration', RegistrationSchema)
module.exports = Registration
