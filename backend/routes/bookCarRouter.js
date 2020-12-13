const { Router } = require('express')
const bookCarControllerRouter = Router()
const bookCarController = require('../controllers/bookCarController')

bookCarControllerRouter.post('/bookCar',  bookCarController.bookCar)

module.exports = bookCarControllerRouter