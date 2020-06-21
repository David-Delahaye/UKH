const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('here')
})


app.listen(5000, function(){
    console.log('listening at 5000');
    
});