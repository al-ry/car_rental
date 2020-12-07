var express = require('express')
var session = require('express-session')
var app = express(), bodyParser = require("body-parser");
var addCarRouter = require('./routes/addCarRouter')
var registerUserRouter = require('./routes/registerUserRouter')
var loginRouter = require('./routes/loginRouter')
var marksRouter = require('./routes/marksRouter')
var modelsRouter = require('./routes/modelsRouter')
var citiesRouter = require('./routes/citiesRouter')
var logoutRouter = require('./routes/logoutRouter')
var userSession = require('./config/sessionsConfig')
var homeRouter = require('./routes/homeRouter')
//var session = require('express-session');
// var cors = require('cors')
// app.use(cors({  
//   credentials: true,
//   origin: true })) 

app.use(userSession)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(addCarRouter)
app.use(registerUserRouter)
app.use(loginRouter)
app.use(marksRouter)
app.use(modelsRouter)
app.use(citiesRouter)
app.use(logoutRouter)
app.use(homeRouter)

app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
