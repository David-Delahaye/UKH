const router = require('express').Router();
const pool = require('../config/db');

// INDEX SITES
router.get('/', async (req,res) => {
    console.log(path.join(__dirname, 'client/build', 'index.html'));
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

router.get('/api/sites', async (req,res) => {
    try{
    const response = await pool.query("SELECT * FROM site;");
    res.send(response.rows);
    }catch(err){
        console.error(err.message);
    }
})

//POST SITE
router.post('/api/sites', async (req,res) => {
    try{
    const {siteName, siteDesc} = req.body;
    const response = await pool.query("INSERT INTO site (site_name, description, created_on) VALUES($1,$2,current_timestamp) RETURNING*;", [siteName, siteDesc]);
    res.send(response.rows);
    }catch(err){
        console.error(err.message);
    }
})

//GET SITE
router.get('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query("SELECT * FROM site WHERE site_id = $1",[site]);
        res.send(response.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//UPDATE SITE
router.put('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const {siteName, siteDesc} = req.body;
        const response = await pool.query("UPDATE site SET site_name =$2 ,description =$3 WHERE site_id = $1 RETURNING*",[site,siteName,siteDesc]);
        res.send(response.rows);
    } catch (err) {
        console.error(err.message);      
    }
})

//DELETE SITE
router.delete('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query ("DELETE FROM site WHERE site_id = $1", [site]);
    } catch (err) {
        console.error(err.message);
        
    }
})

module.exports = router;