const { Router } = require('express')
const homeRouter = Router()
const homeController = require('../controllers/homeController')
const {checkSession} = require('../middlewares/checkSession')

homeRouter.get('/home', checkSession, homeController.home)

module.exports = homeRouter 