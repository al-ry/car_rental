const { Router } = require('express')
const acceptBookingRouter = Router()
const acceptBookingController = require('../controllers/acceptBookingController')
const {checkSession} = require('../middlewares/checkSession')

acceptBookingRouter.post('/acceptBooking', checkSession, acceptBookingController.accept)

module.exports = acceptBookingRouter