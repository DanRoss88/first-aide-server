DROP TABLE IF EXISTS city CASCADE;
CREATE TABLE city (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city_id INTEGER REFERENCES city(id)
);

DROP TABLE IF EXISTS medical_records CASCADE;
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER REFERENCES users(id)
);

DROP TABLE IF EXISTS hospital CASCADE;
CREATE TABLE hospital (
    id SERIAL PRIMARY KEY,
    city_id INTEGER REFERENCES city(id),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    hours VARCHAR(255) NOT NULL,
    er_exists BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS bookmark CASCADE;
CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instruction text NOT NULL,
    users_id INTEGER REFERENCES users(id)
);


DROP TABLE IF EXISTS allergy CASCADE;
CREATE TABLE allergy (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    severity VARCHAR(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);

DROP TABLE IF EXISTS condition CASCADE;
CREATE TABLE condition (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);

DROP TABLE IF EXISTS medication CASCADE;
CREATE TABLE medication (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    medical_records_id INTEGER REFERENCES medical_records(id)
);


DROP TABLE IF EXISTS emergency_contact CASCADE;
CREATE TABLE emergency_contact (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    relationship varchar(255),
    users_id INTEGER REFERENCES users(id)
);


DELETE FROM allergy;
DELETE FROM condition;
DELETE FROM medication;
DELETE FROM emergency_contact;
DELETE FROM hospital;
DELETE FROM medical_records;
DELETE FROM users;
DELETE FROM city;

INSERT INTO city (name)
VALUES
('Vancouver'),
('Burnaby'),
('Surrey'),
('Delta'),
('Coquitlam'),
('Port Moody'),
('West Vancouver'),
('North Vancouver');

INSERT INTO users(username, email, city_id)
VALUES
('Jenny','jenny@email.com', 1);

INSERT INTO medical_records (users_id)
VALUES
(1);

INSERT INTO hospital (city_id, name, address, phone, hours, er_exists)
VALUES 
  (1, 'Vancouver General Hospital', '899 West 12th Avenue', '(604)-875-4111', '24 hours a day, 7 days a week', true),
  (1, 'St. Paul''s Hospital', '1081 Burrard Street', '(604)-682-2344', '24 hours a day, 7 days a week', true),
  (1, 'Mount Saint Joseph Hospital', '3080 Prince Edward Street', '(604)-874-1141', '24 hours a day, 7 days a week', true),
  (2, 'Burnaby Hospital', '3935 Kincaid Street', '(604)-434-4211', '24 hours a day, 7 days a week', true),
  (3, 'Surrey Memorial Hospital', '13750 96 Avenue', '(604)-581-2211', '24 hours a day, 7 days a week', true),
  (4, 'Delta Hospital', '5800 Mountain View Boulevard', '(604)-946-1121', '24 hours a day, 7 days a week', true),
  (5, 'Eagle Ridge Hospital', '475 Guildford Way', '(604)-461-2022', '24 hours a day, 7 days a week', true),
  (6, 'Port Moody Health', '2313 Saint Johns Street', '(604)-469-3131', '24 hours a day, 7 days a week', true),
  (7, 'West Vancouver Medical Clinic', '2121 Marine Drive', '(604)-926-2111', '24 hours a day, 7 days a week', true),
  (8, 'Lions Gate Hospital', '231 East 15th Street', '(604)-988-3131', '24 hours a day, 7 days a week', true);

INSERT INTO allergy (name, severity, medical_records_id)
VALUES
('Peanuts', 'Severe', 1),
('Grass', 'Not Severe', 1);

INSERT INTO condition (name, medical_records_id)
VALUES
('Asthma', 1),
('Anxiety', 1);

INSERT INTO medication (name, medical_records_id)
VALUES
('Salbutimol Inhaler', 1),
('Clonazepam', 1);

INSERT INTO emergency_contact (name, phone, relationship, users_id)
VALUES 
('John Doe', '(555)-555-5555', 'Father', 1),
('Jane Doe', '(555)-555-5556', 'Mother', 1),
('Jack Doe', '(555)-555-5557', 'Uncle', 1);



