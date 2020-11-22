const { Router } = require('express')
const allCarsRouter = Router()
const allCarsController = require('../controllers/allCarsController')

allCarsRouter.get('/allCars', allCarsController.getCars)

module.exports = allCarsRouter