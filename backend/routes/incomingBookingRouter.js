const { Router } = require('express')
const incomingBookingRouter = Router()
const incomingBookingontroller = require('../controllers/incomingBookingController')
const {checkSession} = require('../middlewares/checkSession')


incomingBookingRouter.post('/incomingBooking', checkSession, incomingBookingontroller.getIncomingBooking)

module.exports = incomingBookingRouter