const express = require('express')
const app = express(), bodyParser = require("body-parser");
const addAdvertismentRouter = require('./routes/addAdvertismentRouter')
const registerUserRouter = require('./routes/registerUserRouter')
const loginRouter = require('./routes/loginRouter')
const marksRouter = require('./routes/marksRouter')
const modelsRouter = require('./routes/modelsRouter')
const citiesRouter = require('./routes/citiesRouter')
const logoutRouter = require('./routes/logoutRouter')
const userSession = require('./config/sessionsConfig')
const homeRouter = require('./routes/homeRouter')
const userAdvertismentsRouter = require('./routes/userAdvertismentRotuer')
const closeAdvertismentRouter = require('./routes/closeAdvertisment')
const reopenAdvertismentRouter = require('./routes/reopenAdvertisment')
const bookCarRouter = require('./routes/bookCarRouter')
const advertismentInfoRouter = require('./routes/advertismentInfoRouter')
const advertismentListRouter = require('./routes/advertismentListRouter')
const cors = require('cors');
const editAdvertismentRouter = require('./routes/editAdvertismentRouter');
const acceptBookingRouter = require('./routes/acceptBooking')
const bookedDatesRouter = require('./routes/bookedDatesRouter')
const declineBookingRouter = require('./routes/declineBooking');
const incomingBookingRouter = require('./routes/incomingBookingRouter');

app.use(cors({  
  credentials: true,
  origin: true
 })) 

app.use(userSession)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.use(addAdvertismentRouter)
app.use(registerUserRouter)
app.use(userAdvertismentsRouter)
app.use(loginRouter)
app.use(marksRouter)
app.use(modelsRouter)
app.use(citiesRouter)
app.use(logoutRouter)
app.use(homeRouter)
app.use(userAdvertismentsRouter)
app.use(closeAdvertismentRouter)
app.use(reopenAdvertismentRouter)
app.use(bookCarRouter)
app.use(advertismentInfoRouter)
app.use(advertismentListRouter)
app.use(editAdvertismentRouter)
app.use(acceptBookingRouter)
app.use(bookedDatesRouter)
app.use(declineBookingRouter)
app.use(incomingBookingRouter)



app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
