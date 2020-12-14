const { Router } = require('express')

const userAdvertismentRouter = Router()
const userAdvertismentController = require('../controllers/userAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')

userAdvertismentRouter.get('/userAdvertisments', checkSession, userAdvertismentController.getAdvertisments)
module.exports = userAdvertismentRouter