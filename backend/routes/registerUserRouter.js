const { Router } = require('express')
const registerUserRouter = Router()
const registerUserController = require('../controllers/registerUserController')


registerUserRouter.post('/registerUser', registerUserController.registerUser)

module.exports = registerUserRouter


