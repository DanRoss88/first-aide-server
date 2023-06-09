DROP TABLE if exists bookmark CASCADE;
CREATE TABLE "bookmark" (
    id SERIAL PRIMARY KEY,
    aid_id INTEGER REFERENCES aid(id)
);