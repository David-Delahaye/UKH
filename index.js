const express = require('express');
const app = express();
const pool = require('./db.js');
const PORT = (process.env.PORT || 5000);
const cors = require('cors');

//MiddleWare
app.use(express.static(path.join(__dirname, 'client/src')))
app.use(cors());
app.use(express.json())

// INDEX
app.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, 'client/src', 'index.html'))
})

app.get('/api/sites', async (req,res) => {
    try{
    const response = await pool.query("SELECT * FROM site;");
    res.send(response.rows);
    }catch(err){
        console.error(err.message);
    }
})

//POST
app.post('/api/sites', async (req,res) => {
    try{
    console.log(req.body);
    const {siteName, siteDesc} = req.body;
    const response = await pool.query("INSERT INTO site (site_name, description, created_on) VALUES($1,$2,current_timestamp) RETURNING*;", [siteName, siteDesc]);
    res.send(response.rows);
    }catch(err){
        console.error(err.message);
    }
})

//SPECIFIC
app.get('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query("SELECT * FROM site WHERE site_id = $1",[site]);
        res.send(response.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//UPDATE
app.put('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const {siteName, siteDesc} = req.body;
        const response = await pool.query("UPDATE site SET site_name =$2 ,description =$3 WHERE site_id = $1 RETURNING*",[site,siteName,siteDesc]);
        res.send(response.rows);
    } catch (err) {
        console.error(err.message);      
    }
})

//DELETE
app.delete('/api/sites/:site', async (req,res) => {
    try {
        const {site} = req.params;
        const response = await pool.query ("DELETE FROM site WHERE site_id = $1", [site]);
    } catch (err) {
        console.error(err.message);
        
    }
})


app.listen(PORT, function(){
    console.log('listening at ' + PORT);
});