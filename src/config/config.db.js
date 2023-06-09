// Initialize database connection
require('dotenv').config();
const { Pool } = require('pg');

const dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};
const db = new Pool(dbParams);

db.connect();

db.on('connect', () => {
    console.log('Database connection established');
});

db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


module.exports = db;