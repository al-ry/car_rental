const { Router } = require('express')
const logoutRouter = Router()
const logoutController = require('../controllers/logoutController')


logoutRouter.post('/logoutUser', logoutController.logout)

module.exports = logoutRouter