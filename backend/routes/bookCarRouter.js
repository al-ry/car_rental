const { Router } = require('express')
const bookCarControllerRouter = Router()
const bookCarController = require('../controllers/bookCarController')
const {checkSession} = require('../middlewares/checkSession')

bookCarControllerRouter.post('/bookCar', checkSession,  bookCarController.bookCar)


module.exports = bookCarControllerRouter