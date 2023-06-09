DROP TABLE if exists aid CASCADE;
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id)
)