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
    {passReqToCallback : true },
    function(req, username, password, done) {
        pool.query("SELECT * FROM users WHERE username = $1",[username])
        .then((cb) => {
            const user = (cb.rows[0]);
            if (!user) { 
                console.log('no user');
                req.message = {type: 'fail', content:'Incorrect Username'}
                return done(null, false, req.message); }
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid){
                console.log('valid user')
                req.message = {type: 'success', content:'successfully logged in'}
                return done(null, user, req.message); 
            }else{
                console.log('invalid user')
                req.message = {type: 'fail', content:'Incorrect password'}
                return done(null, false, req.message);
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