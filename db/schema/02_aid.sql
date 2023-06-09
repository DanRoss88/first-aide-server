DROP TABLE if exists aid CASCADE;
CREATE TABLE aid (
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255) NOT NULL,
  patterns VARCHAR(255),
  responses TEXT NOT NULL,
  context_set TEXT
  bookmarked BOOLEAN NOT NULL,
)