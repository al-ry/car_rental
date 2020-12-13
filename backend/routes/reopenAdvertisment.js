const { Router } = require('express')
const reopenAdvertismentRouter = Router()
const reopenAdvertismentController = require('../controllers/reopenAdvertismentController')

reopenAdvertismentRouter.post('/reopenAdvertisment', reopenAdvertismentController.reopenAdvertisment)

module.exports = reopenAdvertismentRouter