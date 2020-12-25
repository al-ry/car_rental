const { Router } = require('express')
const addAdvertismentRouter = Router()
const addAdvertismentController = require('../controllers/addAdvertismentController')
const {checkSession} = require('../middlewares/checkSession')
const {uploadAdvertismentMiddleware} = require('../middlewares/advertismentUploadMIddleware')

addAdvertismentRouter.post('/addAdvertisment', checkSession, uploadAdvertismentMiddleware, addAdvertismentController.addAdvertisment)


module.exports = addAdvertismentRouter


 