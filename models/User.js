const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegistrationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  owner: {
    type: Boolean,
    required: true
  }

})

const registrationModel = mongoose.model('registration', RegistrationSchema)

module.exports = registrationModel
