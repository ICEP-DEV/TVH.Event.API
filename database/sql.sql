/*
DROP TABLE IF EXISTS `notification`;
DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `attendee_favourite_event`;
DROP TABLE IF EXISTS `survey`;
DROP TABLE IF EXISTS `registration`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `attendee`;
DROP TABLE IF EXISTS `organiser`;
DROP TABLE IF EXISTS `admin`;
*/

CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES (1,'admin15','admin@gmail.com','$2b$10$coHCgI9fiHL20LZPOBeucuhkANezBqUGg78d.GCMTp5TzR2XwRwYa','2024-10-03 15:04:53'),(2,'admin2','admin2@gmail.com','$2b$10$xcPwJJa3avKfPt4NP4QFvusQ8qPA5VrD8bGEPMdbCb5J29l3cy1N2','2024-10-03 17:21:20');
UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `attendee` (
  `attendee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attendee_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `organiser` (
  `organiser_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`organiser_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `organiser` WRITE;

INSERT INTO `organiser` VALUES (1,'organiser1','$2b$10$0HW2WBx9qbz2be9jwtlAfe80NpgG/geYTlUrUKXpqYtuaaAepYt7m','2024-10-04 08:20:15','organiser@gmail.com'),(3,'organiser2','$2b$10$7UuHUBM/4Oe2H62AHcbpROgiJuoduHEBjh4ThJDraDXzhQjRUvidW','2024-10-04 08:22:25','organiser2@gmail.com');

UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE IF NOT EXISTS `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `time` timestamp DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `organiser_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `admin fk_idx` (`admin_id`),
  KEY `organiser fk_idx` (`organiser_id`),
  KEY `category fk_idx` (`category_id`),
  CONSTRAINT `admin fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  CONSTRAINT `category fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `organiser fk` FOREIGN KEY (`organiser_id`) REFERENCES `organiser` (`organiser_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `registration` (
  `registration_id` int NOT NULL AUTO_INCREMENT,
  `attendee_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`registration_id`),
  KEY `attendee fk_idx` (`attendee_id`),
  KEY `event fk_idx` (`event_id`),
  CONSTRAINT `registration attendee fk` FOREIGN KEY (`attendee_id`) REFERENCES `attendee` (`attendee_id`),
  CONSTRAINT `registration event fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` int NOT NULL,
  `create_at` date DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `event_id` int NOT NULL,
  `questions` blob,
  PRIMARY KEY (`survey_id`),
  KEY `survey event fk_idx` (`event_id`),
  CONSTRAINT `survey event fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `attendee_favourite_event` (
  `attendee_favourite_event_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `attendee_id` int DEFAULT NULL,
  PRIMARY KEY (`attendee_favourite_event_id`),
  KEY `event fk_idx` (`event_id`),
  KEY `attendee fk_idx` (`attendee_id`),
  CONSTRAINT `attendee fk` FOREIGN KEY (`attendee_id`) REFERENCES `attendee` (`attendee_id`),
  CONSTRAINT `event fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int NOT NULL,
  `registration_id` int DEFAULT NULL,
  `survey_id` int DEFAULT NULL,
  `response` blob,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  KEY `feedback registration_idx` (`registration_id`),
  KEY `feedback survey_idx` (`survey_id`),
  CONSTRAINT `feedback registration` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`),
  CONSTRAINT `feedback survey` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` int NOT NULL,
  `attendee_id` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `message` longtext,
  `organiser_id` int DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `notification attendee fk_idx` (`attendee_id`),
  KEY `notification admin fk_idx` (`admin_id`),
  KEY `notification organiser fk_idx` (`organiser_id`),
  CONSTRAINT `notification admin fk` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  CONSTRAINT `notification attendee fk` FOREIGN KEY (`attendee_id`) REFERENCES `attendee` (`attendee_id`),
  CONSTRAINT `notification organiser fk` FOREIGN KEY (`organiser_id`) REFERENCES `organiser` (`organiser_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;