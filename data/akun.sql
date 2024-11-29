SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*
    Create table akun
*/
CREATE TABLE IF NOT EXISTS `akun` (
    id INT(45) NOT NULL AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(10) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO `akun` (`nama`, `password`, `email`, `role`) VALUES 
("admin", "admin1234", "admin@gmail.com", 'admin'),
("user1", "user1", "user1@gmail.com", 'user'),
("user2", "user2", "user2@gmail.com", "user"),
("user3", "user3", "user3@gmail.com", 'user');