const {Pool} = require ('pg');
require('dotenv/config');
console.log(process.env.LOCAL_STRING);

const pool = new Pool({
    connectionString: (process.env.DATABASE_URL || process.env.LOCAL_STRING)
})

module.exports = pool;