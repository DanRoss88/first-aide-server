DROP TABLE IF EXISTS emergency_contact CASCADE;
CREATE TABLE emergency_contact (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    relationship varchar(255),
    users_id INTEGER REFERENCES users(id)
);