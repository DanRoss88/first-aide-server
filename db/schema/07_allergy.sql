DROP TABLE if exists aid CASCADE;
CREATE TABLE allergy (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id),
);