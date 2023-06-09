DROP TABLE if exists aid CASCADE;
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    aid_id INTEGER REFERENCES aid(id),
);