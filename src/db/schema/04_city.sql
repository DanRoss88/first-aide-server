DROP TABLE if exists aid CASCADE;
CREATE TABLE city (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
);