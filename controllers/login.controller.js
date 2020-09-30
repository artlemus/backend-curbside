const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter required fields' })
    }
    const loginUser = await User.findOne({
      email: req.body.email
    })
    if (!loginUser) {
      res.status(422).json({
        errors: [
          {
            msg: 'User does not exist'
          }
        ]
      })
    } else {
      bcrypt.compare(password, loginUser.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(422).json({ msg: 'Invalid credentials' })
        }
        jwt.sign({ id: User.id }, config.get('jwtSecret'), (err, token) => {
          if (err) throw err
          res.status(201).json({
            token,
            user: {
              email,
              password
            }
          })
        })
      })
    }
  } catch (err) {
    next(err)
  }
}
