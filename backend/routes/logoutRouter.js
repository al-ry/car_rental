const { Router } = require('express')
const logoutRouter = Router()
const logoutController = require('../controllers/logoutController')
const {checkSession} = require('../middlewares/checkSession')


logoutRouter.post('/logoutUser', checkSession, logoutController.logout)

module.exports = logoutRouter