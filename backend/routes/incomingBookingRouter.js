const { Router } = require('express')
const incomingBookingRouter = Router()
const incomingBookingontroller = require('../controllers/incomingBookingController')
const {checkSession} = require('../middlewares/checkSession')


incomingBookingRouter.get('/incomingBooking', checkSession, incomingBookingontroller.getIncomingBooking)

module.exports = incomingBookingRouter