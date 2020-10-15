const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// CREATE USER REQUIREMENTS
const UserRegistration = require('../models/user')

// LOGIN USER REQUIREMENTS
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// CREATE NEW USER
router.post('/create', async (req, res, next) => {
  const { email, password, owner } = req.body
  try {
    let createdUser = await UserRegistration.findOne({
      email
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
      createdUser = new UserRegistration({
        email,
        password,
        owner
      })
      const salt = await bcrypt.genSalt(10)

      createdUser.password = await bcrypt.hash(password, salt)

      await createdUser.save()
      return res.status(201).json(req.body)
    }
  } catch (err) {
    next(err)
  }
})

// LOGIN USER
router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter required fields' })
    }
    const loginUser = await User.findOne({
      email: email
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
          console.log('not a match')
          return res.status(422).json({ msg: 'Invalid credentials' })
        }
        loginUser.password = undefined
        const accessToken = jwt.sign(loginUser.email, process.env.JWT_SECRET)

        return res.status(201).json({ accessToken: accessToken, loginUser })
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
