const { Pool } = require('pg');
const pool = new Pool({
    user: 'myuser',  
    host: 'localhost',
    database: 'myapp',
    password: 'mypassword',
    port: 5432,
});

module.exports = pool;