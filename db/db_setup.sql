DROP DATABASE IF EXISTS shopping_site;
DROP USER IF EXISTS shopping_site_user;

CREATE USER shopping_site_user WITH PASSWORD 'password';
CREATE DATABASE shopping_site WITH OWNER shopping_site_user;

CREATE TABLE users (
  id  SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO users(email, password)
VALUES ('superfigher@street.com', 'boomshaka');
