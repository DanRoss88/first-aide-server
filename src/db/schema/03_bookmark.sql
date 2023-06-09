DROP TABLE IF EXISTS bookmark CASCADE;
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
<<<<<<< HEAD
    aid_id INTEGER REFERENCES aid(id),
    users_id INTEGER REFERENCES users(id)
=======
    instructions_id INTEGER REFERENCES instructions(id)
>>>>>>> schema/seeds
);