const { Router } = require('express')
const citiesRouter = Router()
const citiesController = require('../controllers/citiesController')

citiesRouter.get('/allCities', citiesController.getCities)

module.exports = citiesRouter