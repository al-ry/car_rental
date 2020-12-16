const { Router } = require('express')
const bookedDatesRouter = Router()
const bookedDatesController = require('../controllers/bookedDatesController')

bookedDatesRouter.get('/bookedDates',  bookedDatesController.getDates)

module.exports = bookedDatesRouter