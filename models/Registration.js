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
          itemname: String,
          itemdescription: String,
          image: String,
          itemprice: Number,
          itemallergies: String,
          itemcalories: Number
        }
      ]
    }
  ]
})

const Registration = mongoose.model('registration', RegistrationSchema)
module.exports = Registration
