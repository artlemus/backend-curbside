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
  restaurant: [
    {
      restaurantname: String,
      menuitems:
      [
        {
          name: String,
          description: String,
          allergies: String,
          price: Number,
          image: String,
          calories: Number,
          category: String
        }
      ]
    }
  ]

})

const registrationModel = mongoose.model('registration', RegistrationSchema)

module.exports = registrationModel
