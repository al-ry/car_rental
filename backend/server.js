var express = require('express')
var app = express(), bodyParser = require("body-parser");
var addCarRouter = require('./routes/addCarRouter')
var registerUserRouter = require('./routes/registerUserRouter')
var loginRouter = require('./routes/loginRouter')
var allCarsRouter = require('./routes/allCarsRouter')
var marksRouter = require('./routes/marksRouter')
//var session = require('express-session');
var cors = require('cors')


// app.use(session({
//   store: new (require('connect-pg-simple')(session))(),
//   secret: process.env.FOO_COOKIE_SECRET,
//   resave: false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
// }));
app.use(cors({  
  credentials: true,
  origin: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(addCarRouter)
app.use(registerUserRouter)
app.use(loginRouter)
app.use(allCarsRouter)
app.use(marksRouter)


app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
