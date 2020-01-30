CREATE DATABASE `ecoute_ecrit`;

USE `ecoute_ecrit`;

CREATE TABLE `ec_users` (
  `ec_id` INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ec_firstname` VARCHAR(255) NOT NULL,
  `ec_lastname` VARCHAR(255) NOT NULL,
  `ec_address` VARCHAR(255) NOT NULL,
  `ec_email` VARCHAR(255) UNIQUE NOT NULL,
  `ec_password` VARCHAR(255) NOT NULL
)ENGINE = INNODB;

--table join
CREATE TABLE `ec_usersbooks` (
  `ecub_id` INT PRIMARY KEY AUTO_INCREMENT,
  `ec_id` INT,
  `ecb_id` INT
)ENGINE = INNODB;

CREATE TABLE `ec_bookshead` (
  `ecb_id` INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ecb_author` VARCHAR(255) NOT NULL,
  `ecb_title` VARCHAR(255) NOT NULL,
  `ecb_subtitle` VARCHAR(255),
  `ecb_otherbooks` VARCHAR(255),
  `ecb_dedication` VARCHAR(255),
  `ecb_quotes` VARCHAR(255),
  `ecb_thanks` TINYTEXT,
  `ecb_preface` TINYTEXT,
  `ecb_prologue` TINYTEXT,
  `ecb_foreword` TINYTEXT,
  `ecb_preambule` TINYTEXT,
  `ecb_resume` TINYTEXT,
  `ecbk_id` INT
)ENGINE = INNODB;
--table join
CREATE TABLE `ec_booksbody` (
  `ecbk_id` int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ecbk_partie` INT,
  `ecbk_chapter` INT,
  `ecbk_subchapter` INT,
  `ecbk_text` INT
)ENGINE = INNODB;

CREATE TABLE `ec_partie` (
  `ecpt_id` int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ecpt_partie` TEXT,
  `ecpt_partie1` TEXT,
  `ecpt_partie2` TEXT,
  `ecpt_partie3` TEXT
)ENGINE = INNODB;

CREATE TABLE `ec_chapter` (
  `ecch_id` int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ecch_chapter` VARCHAR(255),
  `ecch_chapter1` VARCHAR(255),
  `ecch_chapter2` VARCHAR(255),
  `ecch_chapter3` VARCHAR(255)
)ENGINE = INNODB;

CREATE TABLE `ec_subchapter` (
  `ecsch_id` int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ecsch_subchapter` VARCHAR(255),
  `ecsch_subchapter1` VARCHAR(255),
  `ecsch_subchapter2` VARCHAR(255),
  `ecsch_subchapter3` VARCHAR(255)
)ENGINE = INNODB;

CREATE TABLE `ec_text` (
  `ectxt_id` int PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  `ectxt_text` TEXT,
  `ectxt_text1` TEXT,
  `ectxt_text2` TEXT,
  `ectxt_text3` TEXT
)ENGINE = INNODB;

--JOIN TABLE
ALTER TABLE `ec_usersbooks` ADD FOREIGN KEY (`ec_id`) REFERENCES `ec_users` (`ec_id`); --JOIN USERS TO USRBOOK

ALTER TABLE `ec_usersbooks` ADD FOREIGN KEY (`ec_id`) REFERENCES `ec_usersbooks` (`ecb_id`);

ALTER TABLE `ec_usersbooks` ADD FOREIGN KEY (`ecb_id`) REFERENCES `ec_bookshead` (`ecb_id`);

ALTER TABLE `ec_bookshead` ADD FOREIGN KEY (`ecb_id`) REFERENCES `ec_usersbooks` (`ecb_id`);

ALTER TABLE `ec_booksbody` ADD FOREIGN KEY (`ecbk_partie`) REFERENCES `ec_partie` (`ecpt_id`);

ALTER TABLE `ec_booksbody` ADD FOREIGN KEY (`ecbk_chapter`) REFERENCES `ec_chapter` (`ecch_id`);

ALTER TABLE `ec_booksbody` ADD FOREIGN KEY (`ecbk_subchapter`) REFERENCES `ec_subchapter` (`ecsch_id`);

ALTER TABLE `ec_booksbody` ADD FOREIGN KEY (`ecbk_text`) REFERENCES `ec_text` (`ectxt_id`);

ALTER TABLE `ec_booksbody` ADD FOREIGN KEY (`ecbk_id`) REFERENCES `ec_bookshead` (`ecbk_id`);
