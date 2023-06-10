DROP TABLE IF EXISTS bookmark CASCADE;
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instruction text NOT NULL,
    users_id INTEGER REFERENCES users(id)
);