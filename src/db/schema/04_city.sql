DROP TABLE IF EXISTS city CASCADE;
CREATE TABLE city (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL
);