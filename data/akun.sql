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
    profile VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO `akun` (`nama`, `password`, `email`, `role`, `profile`) VALUES 
-- Admin account
("Admin Master", "adminmaster2024", "adminmaster@gmail.com", "admin", "https://i.pravatar.cc/1000?u=15"),

-- User accounts
("John Doe", "johndoe123", "johndoe@gmail.com", "user", "https://i.pravatar.cc/1000?u=1"),
("Jane Smith", "janesmith123", "janesmith@gmail.com", "user", "https://i.pravatar.cc/1000?u=2"),
("Robert Brown", "robertbrown123", "robertbrown@gmail.com", "user", "https://i.pravatar.cc/1000?u=3"),
("Emily Davis", "emilydavis123", "emilydavis@gmail.com", "user", "https://i.pravatar.cc/1000?u=4"),
("Michael Wilson", "michaelwilson123", "michaelwilson@gmail.com", "user", "https://i.pravatar.cc/1000?u=5"),
("Sarah Johnson", "sarahjohnson123", "sarahjohnson@gmail.com", "user", "https://i.pravatar.cc/1000?u=6"),
("David Martinez", "davidmartinez123", "davidmartinez@gmail.com", "user", "https://i.pravatar.cc/1000?u=7"),
("Laura Garcia", "lauragarcia123", "lauragarcia@gmail.com", "user", "https://i.pravatar.cc/1000?u=8"),
("Daniel Hernandez", "danielhernandez123", "danielhernandez@gmail.com", "user", "https://i.pravatar.cc/1000?u=9"),
("Sophia Lopez", "sophialopez123", "sophialopez@gmail.com", "user", "https://i.pravatar.cc/1000?u=10"),
("William Anderson", "williamanderson123", "williamanderson@gmail.com", "user", "https://i.pravatar.cc/1000?u=11");
