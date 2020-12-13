var express = require('express')
var app = express(), bodyParser = require("body-parser");

var addAdvertismentRouter = require('./routes/addAdvertismentRouter')
var registerUserRouter = require('./routes/registerUserRouter')
var loginRouter = require('./routes/loginRouter')
var marksRouter = require('./routes/marksRouter')
var modelsRouter = require('./routes/modelsRouter')
var citiesRouter = require('./routes/citiesRouter')
var logoutRouter = require('./routes/logoutRouter')
var userSession = require('./config/sessionsConfig')
var homeRouter = require('./routes/homeRouter')
var userAdvertismentsRouter = require('./routes/userAdvertismentRotuer')
var closeAdvertismentRouter = require('./routes/closeAdvertisment')
var reopenAdvertismentRouter = require('./routes/reopenAdvertisment')
var bookCarRouter = require('./routes/bookCarRouter')
var cors = require('cors')

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

app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
