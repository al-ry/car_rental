const { Router } = require('express')
const homeRouter = Router()
const homeController = require('../controllers/homeController')

homeRouter.get('/home', homeController.checkSession)

module.exports = homeRouter 