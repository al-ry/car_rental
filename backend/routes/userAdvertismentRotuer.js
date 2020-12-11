const { Router } = require('express')

const userAdvertismentRouter = Router()
const userAdvertismentController = require('../controllers/userAdvertismentController')

userAdvertismentRouter.get('/userAdvertisments', userAdvertismentController.getAdvertisments)
module.exports = userAdvertismentRouter