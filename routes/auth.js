const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const pool = require('../config/db');


//----------------POSTS
router.get('/api/user', (req,res) => {
    res.status(200).json({ username: req.user.username});
})

router.get('/api/user/:user', async (req,res) => {
    const {user} = req.params
    try {
    const response = await pool.query("SELECT * FROM users WHERE user_id = $1",[user]);
    console.log(response.rows[0]);
    res.json({username: response.rows[0].username})
    } catch (err) {
        console.error(err.message);
    }
})

router.post('/api/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    
    const username = req.body.username;
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    pool.query("INSERT INTO users (username, hash, salt) VALUES($1,$2,$3)", [username, hash, salt])
        res.status(200).json({ msg: 'Registered'});
 });

router.post('/api/login', passport.authenticate('local'), (req,res) => res.status(200).json({ username: req.user.username}));

module.exports= router;
