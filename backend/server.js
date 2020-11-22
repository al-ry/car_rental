var express = require('express')
var app = express(), bodyParser = require("body-parser");
var addCarRouter = require('./routes/addCarRouter')
var registerUserRouter = require('./routes/registerUserRouter')
var loginRouter = require('./routes/loginRouter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(addCarRouter)
app.use(registerUserRouter)
app.use(loginRouter)


app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
