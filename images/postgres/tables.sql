-- stores account information
-- phone-number length is according to
-- https://www.itu.int/rec/T-REC-E.164-201011-I
CREATE TABLE Account (
id SERIAL PRIMARY KEY,
uuid UUID NOT NULL DEFAULT gen_random_uuid(),
added TIMESTAMP NOT NULL DEFAULT NOW(),
deleted TIMESTAMP DEFAULT NULL,
first_name VARCHAR(256) NOT NULL,
last_name VARCHAR(256) NOT NULL,
phone_number VARCHAR(15) NOT NULL,
email VARCHAR(320) NOT NULL
);

-- stores passwords for accounts
CREATE TABLE Password (
id SERIAL PRIMARY KEY,
added TIMESTAMP NOT NULL NOW(),
deleted TIMESTAMP DEFAULT NULL,
hash BYTEA(16) NOT NULL,
salt BYTEA(16) NOT NULL UNIQUE,
account INT REFERENCES Account(id)
);

-- contains the different roles for administrating website
-- from the dashboard
CREATE TABLE Role (
id SERIAL PRIMARY KEY,
uuid UUID NOT NULL DEFAULT gen_random_uuid(),
added TIMESTAMP NOT NULL NOW(),
deleted TIMESTAMP DEFAULT NULL,
title VARCHAR(256) NOT NULL
);

-- maps the accounts and roles together
CREATE TABLE Account_Role (
id SERIAL PRIMARY KEY,
account INT REFERENCES Account(id) NOT NULL,
role INT REFERENCES Role(id) NOT NULL
);
