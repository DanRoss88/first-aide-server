/// Reset the database
require('dotenv').config();
const { Pool } = require('pg');

const dbParams = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
};

const db = new Pool(dbParams);

db.connect();

db.on('connect', () => {
    console.log('Database connection established');
}
);

db.on('error', (err) => { 
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
}
);


