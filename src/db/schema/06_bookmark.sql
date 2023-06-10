DROP TABLE IF EXISTS bookmark CASCADE;
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    instructions_id INTEGER REFERENCES instructions(id),
    users_id INTEGER REFERENCES users(id)
);