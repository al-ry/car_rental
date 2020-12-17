const { Router } = require('express')
const outgoingBookingRouter = Router()
const outgoingBookingController = require('../controllers/outgoingBookingController')
const {checkSession} = require('../middlewares/checkSession')


outgoingBookingRouter.get('/outgoingBooking', checkSession, outgoingBookingController.getOutgoingBooking)

module.exports = outgoingBookingRouter