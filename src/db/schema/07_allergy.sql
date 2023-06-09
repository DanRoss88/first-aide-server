DROP TABLE IF EXISTS allergy CASCADE;
CREATE TABLE allergy (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    severity VARCHAR(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);