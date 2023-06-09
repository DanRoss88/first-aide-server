// Initialize database connection
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'first_aide',
    user: 'labber',
    password: 'labber',
});

module.exports = pool;