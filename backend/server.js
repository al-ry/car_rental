var express = require('express')
var app = express(), bodyParser = require("body-parser");
var addCarRouter = require('./routes/addCarRouter')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(addCarRouter)

app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
