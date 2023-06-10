DROP TABLE IF EXISTS medical_records CASCADE;
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER REFERENCES users(id)
);