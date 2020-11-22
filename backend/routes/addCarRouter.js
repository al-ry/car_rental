const { Router } = require('express')
const addCarRouter = Router()
const addCarController = require('../controllers/addCarController')

addCarRouter.post('/addCar', addCarController.addCar)

module.exports = addCarRouter


