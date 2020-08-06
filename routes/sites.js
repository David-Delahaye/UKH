const router = require('express').Router();
const pool = require('../config/db');
const {isAuth, isSiteOwner, siteOwnerOnly} = require('../lib/authUtils');

// INDEX SITES
router.get('/api/sites', async (req,res) => {
    //Get order
    try{
    const orderStart = 'ORDER BY '
    const orderQuery = req.query.order + ' ';
    const direction = req.query.direction;
    const order = req.query.order ? orderStart + orderQuery + direction + ';' :';';

    //NAME AND TAGS
    if (req.query.name && req.query.tags){
        const nameQuery = `%${req.query.name}%`
        const tagsQuery = `{${req.query.tags}}`
        const text = await "SELECT * FROM site WHERE LOWER(site_name) LIKE LOWER($1) AND tags @> $2 " + order;
        const response = await pool.query(text, [nameQuery, tagsQuery]);
        res.send(response.rows);
    //JUST NAME SEARCH
    }else if (req.query.name){
        const query = `%${req.query.name}%`
        const text = "SELECT * FROM site WHERE LOWER(site_name) LIKE LOWER($1) " + order;
        const response = await pool.query(text , [query]);
        res.send(response.rows);
    //JUST TAGS
    }else if (req.query.tags){
        const query = `{${req.query.tags}}`
        const text = "SELECT * FROM site WHERE tags @> $1 " + order;
        const response = await pool.query(text , [query]);
        res.send(response.rows);
    //NO SEARCH
    }else{
        const text = "SELECT * FROM site " + order;
        const response = await pool.query(text);
        res.send(response.rows);
    }
    
    }catch(err){      
        console.error(err.message);
    }
})

//POST SITE
router.post('/api/sites', isAuth, async (req,res) => {
    try{
    let {siteName, siteDesc, siteTags, siteImage, siteLink, sitePrice} = req.body;
    const owner_id = req.user.user_id;
    const response = await pool.query("INSERT INTO site (site_name, description, owner_id, tags, image_link, shop_link, price, created_on) VALUES($1,$2,$3,$4,$5,$6,$7, current_timestamp) RETURNING*;", [siteName, siteDesc, owner_id, siteTags, siteImage, siteLink, sitePrice]);
    res.status(200).json({ message: {type: 'success', content:'Successfully created site'} })
    }catch(err){
        console.error(err.message);
    }
})

//GET SITE
router.get('/api/sites/:site', isSiteOwner, async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query("SELECT * FROM site WHERE site_id = $1",[site]);
        const {owner_id} = (response.rows[0]);
        const owner = await pool.query("SELECT * FROM users WHERE user_id = $1",[owner_id]);
        response.rows[0].owner = owner.rows[0].username;
        response.rows[0].isOwner = req.isOwner;
        res.send(response.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//UPDATE SITE
router.put('/api/sites/:site', siteOwnerOnly, async (req,res) => {
    try {
        const {site} = req.params;
        const {siteName, siteDesc, siteImage, siteTags, siteLink, sitePrice} = req.body;
        const response = await pool.query("UPDATE site SET site_name =$2, description =$3, tags =$4, image_link =$5, shop_link =$6, price =$7 WHERE site_id = $1 RETURNING*",[site,siteName,siteDesc,siteTags,siteImage, siteLink, sitePrice]);
        res.status(200).json({ message: {type: 'success', content:'Successfully edited site'} })
    } catch (err) {
        console.error(err.message);      
    }
})

//DELETE SITE
router.delete('/api/sites/:site', siteOwnerOnly, async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query ("DELETE FROM site WHERE site_id = $1", [site]);
        res.status(200).json({ message: {type: 'success', content:'Successfully deleted site'} })
    } catch (err) {
        console.error(err.message);
        
    }
})

module.exports = router;