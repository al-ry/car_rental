const { Router } = require('express')
const closeAdvertismentRouter = Router()
const closeAdvertismentController = require('../controllers/closeAdvertismentController')

closeAdvertismentRouter.post('/closeAdvertisment', closeAdvertismentController.closeAdvertisment)

module.exports = closeAdvertismentRouter