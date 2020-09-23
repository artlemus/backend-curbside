const Registration = require('../models/Registration')
const bcrypt = require('bcryptjs')

exports.registerUser = async (req, res, next) => {
  const { restaurant, email, password } = req.body
  try {
    let createdUser = await Registration.findOne({
      email, restaurant
    })
    if (createdUser) {
      res.status(422).json({
        errors: [
          {
            msg: 'User already exists'
          }
        ]
      })
    } else {
      createdUser = new Registration({
        restaurant,
        email,
        password
      })
      const salt = await bcrypt.genSalt(10)

      createdUser.password = await bcrypt.hash(password, salt)

      await createdUser.save()
      res.status(201).json(req.body)
    }
  } catch (err) {
    next(err)
  }
}
