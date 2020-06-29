const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const { response } = require('express');
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
            if (!user) { console.log('no user');
             return done(null, false); }
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid){
                console.log('valid user')
                return done(null, user); 
            }else{
                console.log('invalid user')
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });
    }
  ));


passport.serializeUser((user, done) => { 
    done(null, user.user_id);
});

passport.deserializeUser((userId, done) => {
    pool.query("SELECT * FROM users WHERE user_id = $1",[userId])
        .then((response) => {return response.rows[0]})
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});