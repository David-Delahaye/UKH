const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const validPassword = require('../lib/passwordUtils').validPassword;

// const customFields = {
//     usernameField: 'username',
//     passwordField: 'password'
// };

passport.use(new LocalStrategy(
    function(username, password, done) {
        pool.query("SELECT * FROM users WHERE username = $1",[username])
        .then((cb) => {
            const user = (cb.rows[0]);
            if (!user) { return done(null, false); }
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid){
                return done(null, user); 
            }else{
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });
    }
  ));


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    pool.query("SELECT * FROM users WHERE username = $1",[username])
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});