const { Router } = require('express')
const closeAdvertismentRouter = Router()
const closeAdvertismentController = require('../controllers/closeAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')

closeAdvertismentRouter.post('/closeAdvertisment', checkSession, closeAdvertismentController.closeAdvertisment)

module.exports = closeAdvertismentRouter