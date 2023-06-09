DROP TABLE IF EXISTS medication CASCADE;
CREATE TABLE medication (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);