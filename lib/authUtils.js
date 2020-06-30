const pool = require('../config/db');

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not logged in'});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

module.exports.isSiteOwner = async (req, res, next) => {
    if (req.isAuthenticated()){
        const {site} = req.params;
        const response = await pool.query("SELECT * FROM site WHERE site_id = $1",[site]);
        const {owner_id} = response.rows[0];
        if(req.user.user_id === owner_id){
            req.isOwner = true;
            next()
        }else{
            req.isOwner = false;
            next()
        }
    }else{
        req.isOwner = false;
        next();
    }
}