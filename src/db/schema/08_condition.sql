DROP TABLE IF EXISTS condition CASCADE;
CREATE TABLE condition (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);