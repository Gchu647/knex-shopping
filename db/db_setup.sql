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


CREATE TABLE products (
  id  SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description TEXT,
  inventory INTEGER NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cart (
  id  SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  products_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);