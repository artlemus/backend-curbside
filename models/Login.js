const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginSchema = new Schema({
  registration: {
    type: Schema.Types.ObjectId,
    ref: 'Registration'
  },

  password: {
    type: String,
    required: true
  }
})

const Login = mongoose.model('login', LoginSchema)

module.exports = Login
