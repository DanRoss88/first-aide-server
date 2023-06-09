DROP TABLE if exists aid CASCADE;
CREATE TABLE aid (
  id SERIAL PRIMARY KEY NOT NULL,
  category VARCHAR(255) NOT NULL,
  area_of_body VARCHAR(255),
  instructions TEXT NOT NULL,
  bookmarked BOOLEAN NOT NULL,
)