const { Router } = require('express')
const reopenAdvertismentRouter = Router()
const reopenAdvertismentController = require('../controllers/reopenAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')

reopenAdvertismentRouter.post('/reopenAdvertisment', checkSession, reopenAdvertismentController.reopenAdvertisment)

module.exports = reopenAdvertismentRouter