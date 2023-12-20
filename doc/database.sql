-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment_services`
--

DROP TABLE IF EXISTS `appointment_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_services` (
                                        `appointment_services_id` int NOT NULL AUTO_INCREMENT,
                                        `service_id` int DEFAULT NULL,
                                        `appointment_id` int DEFAULT NULL,
                                        PRIMARY KEY (`appointment_services_id`),
                                        UNIQUE KEY `haircut_appointment_haircut_appointment_id_uindex` (`appointment_services_id`),
                                        KEY `haircut_id` (`service_id`),
                                        KEY `appointment_id` (`appointment_id`),
                                        CONSTRAINT `appointment_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`),
                                        CONSTRAINT `appointment_services_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_services`
--

LOCK TABLES `appointment_services` WRITE;
/*!40000 ALTER TABLE `appointment_services` DISABLE KEYS */;
INSERT INTO `appointment_services` VALUES (1,2,3),(2,5,3),(3,1,3),(4,3,1),(5,4,2),(6,7,1),(8,3,35);
/*!40000 ALTER TABLE `appointment_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
                                `appointment_id` int NOT NULL AUTO_INCREMENT,
                                `client_id` int DEFAULT NULL,
                                `slot_id` int DEFAULT NULL,
                                PRIMARY KEY (`appointment_id`),
                                KEY `client_id` (`client_id`),
                                KEY `slot_id` (`slot_id`),
                                CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
                                CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`slot_id`) REFERENCES `time_slots` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,2),(2,2,4),(3,3,5),(13,19,2),(14,21,2),(15,25,1),(16,26,3),(17,27,2),(18,29,4),(19,30,5),(20,31,5),(21,32,3),(22,33,1),(23,34,3),(24,38,3),(25,39,2),(26,40,3),(27,41,3),(28,42,4),(29,43,5),(30,44,3),(31,45,1),(32,46,4),(33,47,1),(34,48,2),(35,50,2),(36,51,1),(37,52,1),(38,53,3),(39,54,2),(40,55,1),(41,56,3);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
                            `category_id` int NOT NULL AUTO_INCREMENT,
                            `name` enum('Men','Women','Children') NOT NULL,
                            PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men'),(2,'Women'),(3,'Children');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
                           `client_id` int NOT NULL AUTO_INCREMENT,
                           `name` varchar(255) NOT NULL,
                           `phone_number` varchar(20) NOT NULL,
                           `address` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'John Doe','123-456-7890','123 Main St'),(2,'Jane Smith','987-654-3210','456 Elm St'),(3,'Michael Johnson','555-555-5555','789 Oak Ave'),(4,'n','n','n'),(5,'j','j','j'),(6,'daniil','555 ','moisavahe'),(7,'d','n','n'),(8,'j','j','n'),(9,'n','n','n'),(10,'j','j','j'),(11,'k','n','n'),(12,'mj','j','j'),(13,'j','j','jj'),(14,'j','j','j'),(15,'N','N','N'),(16,'k','n','km'),(17,'mN','k','j'),(18,'j','j','j'),(19,'j','j','j'),(20,'k','k','k'),(21,'n','n','n'),(22,'m','m','m'),(23,'n','n','n'),(24,'j','j','j'),(25,'j','j','j'),(26,'k','k','k'),(27,'j','j','j'),(28,'k','k','k'),(29,'j','j','j'),(30,'n','n','n'),(31,'n','n','n'),(32,'j','j','j'),(33,'m','m','m'),(34,'m','m','m'),(35,'m','m','m'),(36,'m','m','m'),(37,'k','k','k'),(38,'n','n','n'),(39,'n','n','n'),(40,'j','j','j'),(41,'hj','j','j'),(42,'k','nj','k'),(43,'test','test','test'),(44,'Daniil','555','email'),(45,'n','n','nn'),(46,'Daniil','555','annelinn'),(47,'Jhon','555','j@mail.ee'),(48,'enw','123','ad'),(49,'new name','123456','mail'),(50,'test','12356','test mail'),(51,'test','12','test1'),(52,'1','1','1'),(53,'nde','h','j'),(54,'n','n','n'),(55,'nj','nj','nj'),(56,'n','j','j'),(57,'working','m','mail'),(58,'working?','test','test'),(59,'e','e','e');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dates`
--

DROP TABLE IF EXISTS `dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dates` (
                         `date_id` int NOT NULL AUTO_INCREMENT,
                         `date` date NOT NULL,
                         PRIMARY KEY (`date_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
INSERT INTO `dates` VALUES (1,'2023-06-01'),(2,'2023-06-02'),(3,'2023-06-03'),(4,'2023-06-04');
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
                           `invoice_id` int NOT NULL AUTO_INCREMENT,
                           `total_price` decimal(10,2) NOT NULL,
                           `appointment_id` int NOT NULL,
                           PRIMARY KEY (`invoice_id`),
                           UNIQUE KEY `invoice_invoice_id_uindex` (`invoice_id`),
                           KEY `appointment` (`appointment_id`),
                           CONSTRAINT `appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,90.00,3);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
                           `service_id` int NOT NULL AUTO_INCREMENT,
                           `category_id` int DEFAULT NULL,
                           `name` varchar(255) NOT NULL,
                           `duration_minutes` int NOT NULL,
                           `price` decimal(10,2) NOT NULL,
                           PRIMARY KEY (`service_id`),
                           KEY `section_id` (`category_id`),
                           CONSTRAINT `service_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,2,'Short Haircut',90,10.00),(2,1,'Classic Haircut',45,35.00),(3,3,'Buzz Cut',15,20.00),(4,2,'Long Layers',60,30.00),(5,1,'Bob Cut',40,45.00),(6,1,'Kid\'s Trim',20,14.00),(7,3,'Fun Hairstyle',30,43.00);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_slots`
--

DROP TABLE IF EXISTS `time_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slots` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `date_id` int DEFAULT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `date_id` (`date_id`),
  CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`date_id`) REFERENCES `dates` (`date_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slots`
--

LOCK TABLES `time_slots` WRITE;
/*!40000 ALTER TABLE `time_slots` DISABLE KEYS */;
INSERT INTO `time_slots` VALUES (1,1,'10:00:00'),(2,1,'11:00:00'),(3,2,'14:00:00'),(4,2,'15:00:00'),(5,3,'09:00:00'),(6,1,'16:00:00');
/*!40000 ALTER TABLE `time_slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `worker_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`worker_id`),
  UNIQUE KEY `worker_worker_id_uindex` (`worker_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (1,'Jelena'),(2,'Mari');
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker_services`
--

DROP TABLE IF EXISTS `worker_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `worker_id` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `worker_id` (`worker_id`),
  KEY `haircut_id` (`service_id`),
  CONSTRAINT `worker_services_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`worker_id`),
  CONSTRAINT `worker_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker_services`
--

LOCK TABLES `worker_services` WRITE;
/*!40000 ALTER TABLE `worker_services` DISABLE KEYS */;
INSERT INTO `worker_services` VALUES (1,1,1),(2,1,4),(3,1,5),(4,1,6),(5,2,1),(6,2,2),(7,2,3),(8,2,5),(9,2,6);
/*!40000 ALTER TABLE `worker_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-08 14:53:03