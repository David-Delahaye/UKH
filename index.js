const express = require('express');
const app = express();
const pool = require('./config/db.js');
const path = require('path');
const PORT = (process.env.PORT || 5000);
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv/config');

//MiddleWare --------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    store: new pgSession({
      pool : pool,
    }),
    saveUninitialized:true,
    secret: process.env.SECRET,
    resave: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 } // 1 day
  }));

// PASSPORT INIT -------------------------------------------------------
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    // console.log(req.user);
    next();
});

 //Routes ----------------------------------------------------------

 const sites = require('./routes/sites');
 const auth = require('./routes/auth');
 app.use(sites)
 app.use(auth)


app.listen(PORT, function(){
    console.log('listening at ' + PORT);
});