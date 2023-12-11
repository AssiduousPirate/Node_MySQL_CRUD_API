CREATE DATABASE `nodemysqlcrudapi`;

USE `nodemysqlcrudapi`;

SET sql_mode = 'NO_ENGINE_SUBSTITUTION';

CREATE TABLE `nodemysqlcrudapi`.`posts` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(45) NULL,
   `title` VARCHAR(45) NULL,
   `description` VARCHAR(500) NULL,
   `image` VARCHAR(45) NULL,
   `category` VARCHAR(45) NULL,
   `author` VARCHAR(45) NULL,
   `city` VARCHAR(45) NULL,
   `status` VARCHAR(45) NULL,
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);