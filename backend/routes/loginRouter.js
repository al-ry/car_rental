const { Router } = require('express')
const loginRouter = Router()
const loginController = require('../controllers/loginController')


loginRouter.post('/loginUser', loginController.login)

module.exports = loginRouter


