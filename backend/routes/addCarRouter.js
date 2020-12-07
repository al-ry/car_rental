const { Router } = require('express')
const addCarRouter = Router()
const addCarController = require('../controllers/addCarController')

const {uploadAdvertisment} = require('../config/multerStorageConfig')


addCarRouter.post('/addCar', uploadAdvertisment.array('files'), addCarController.addCar)

module.exports = addCarRouter