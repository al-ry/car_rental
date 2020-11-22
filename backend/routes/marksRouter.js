const { Router } = require('express')
const allCarsRouter = Router()
const marksController = require('../controllers/marksController')

allCarsRouter.get('/marksList', marksController.getMarks)

module.exports = allCarsRouter