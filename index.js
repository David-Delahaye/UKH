const express = require('express');
const app = express();
const pool = require('./db.js');
const path = require('path');
const PORT = (process.env.PORT || 5000);
const cors = require('cors');
const sites = require('./routes/sites')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);


//MiddleWare --------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors());
app.use(express.json())
app.use(session({
    store: new pgSession({
      pool : pool,
    }),
    saveUninitialized:true,
    secret: process.env.SECRET,
    resave: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 } // 1 day
  }));


 //Routes ----------------------------------------------------------
 app.use(sites)


app.listen(PORT, function(){
    console.log('listening at ' + PORT);
});