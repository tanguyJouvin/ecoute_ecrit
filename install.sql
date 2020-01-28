SHOW DATABASES;

CREATE DATABASE `ecoute_ecrit`;

USE `ecoute_ecrit`;

CREATE TABLE `ec_users` (
  ec_id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  ec_firstname VARCHAR(255) NOT NULL,
  ec_lastname VARCHAR(255) NOT NULL,
  ec_adress VARCHAR(255) NOT NULL,
  ec_email VARCHAR(255) UNIQUE NOT NULL
)
ENGINE = INNODB;

CREATE TABLE `ec_users_books` (
  ecub_id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  CONSTRAINT fk_ec_users
  FOREIGN KEY (ec_users_ec_id)
  REFERENCES ec_users(ec_id),
  CONSTRAINT fk_ec_books
  FOREIGN KEY (ec_books_ecb_id)
  REFERENCES ec_books(ecb_id)
)
ENGINE = INNODB;

CREATE TABLE `ec_books` (
  ecb_id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  ecb_author VARCHAR(255) NOT NULL,
  ecb_title VARCHAR(255) NOT NULL,
  ecb_subtitle VARCHAR(255) NOT NULL,
  ecb_email VARCHAR(255) NOT NULL
)
ENGINE = INNODB;

SHOW TABLES;

DESCRIBE `ec_books`;