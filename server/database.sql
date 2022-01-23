CREATE DATABASE crud;

CREATE TABLE listings(
    item_id SERIAL PRIMARY KEY,
    item_decription VARCHAR (500),
    item_photo VARCHAR (500),
    item_price REAL
);