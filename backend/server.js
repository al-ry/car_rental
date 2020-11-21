var express = require('express')
var app = express()
const pool = require('./database/db');

app.listen(3000, () => {
  console.log('Server started on port 3000...')
})