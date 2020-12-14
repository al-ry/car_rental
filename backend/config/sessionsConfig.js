var pg = require('pg')
  , session = require('express-session')
  , pgSession = require('connect-pg-simple')(session);
require('dotenv').config()


var pgPool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

module.exports = session({
  store: new pgSession({
    pool : pgPool,               
    tableName : 'session'   
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false, 
  saveUninitialized: false, 
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});
