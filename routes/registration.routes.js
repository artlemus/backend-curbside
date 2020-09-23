const express = require('express')
const registrationController = require('../controllers/registration.controller')
const router = express.Router()

router.post('/new', registrationController.registerUser)

module.exports = router
