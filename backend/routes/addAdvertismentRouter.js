const { Router } = require('express')
const addAdvertismentRouter = Router()
const addAdvertismentController = require('../controllers/addAdvertismentController')

const {uploadAdvertisment} = require('../config/multerStorageConfig')

addAdvertismentRouter.post('/addCar', uploadAdvertisment.array('files', 6), addAdvertismentController.addAdvertisment)

module.exports = addAdvertismentRouter