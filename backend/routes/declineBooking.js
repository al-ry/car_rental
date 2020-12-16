const { Router } = require('express')
const declineBookingRouter = Router()
const declineBookingController = require('../controllers/declineBookingController')
const {checkSession} = require('../middlewares/checkSession')

declineBookingRouter.post('/declineBooking', checkSession, declineBookingController.decline)

module.exports = declineBookingRouter