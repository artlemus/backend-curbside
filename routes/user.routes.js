const express = require('express')
const registrationController = require('../controllers/registration.controller')
const loginController = require('../controllers/login.controller')
const router = express.Router()


router.post('/user/create', registrationController.registerUser)
router.post('/user/login', loginController.loginUser)

module.exports = router
