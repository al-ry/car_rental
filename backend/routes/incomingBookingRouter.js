const { Router } = require('express')
const incomingBookingRouter = Router()
const incomingBookingontroller = require('../controllers/incomingBookingController')


incomingBookingRouter.post('/incomingBooking', incomingBookingontroller.getIncomingBooking)

module.exports = incomingBookingRouter