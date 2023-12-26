-- MySQL dump 10.13  Distrib 8.1.0, for macos14.0 (arm64)
--
-- Host: localhost    Database: database
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `about_services`
--

DROP TABLE IF EXISTS `about_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_services` (
  `name_et` varchar(20) DEFAULT NULL,
  `description_et` varchar(250) DEFAULT NULL,
  `name_ru` varchar(250) DEFAULT NULL,
  `description_ru` varchar(250) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_services`
--

LOCK TABLES `about_services` WRITE;
/*!40000 ALTER TABLE `about_services` DISABLE KEYS */;
INSERT INTO `about_services` VALUES ('LÕIKUS','Juuste lõikus pole mitte ainult esmavajalik juuste hooldamise põhiprotseduur, vaid ka eneseväljenduse viis ning teie imago ja stiili lähtepunkt.\n\n','СТРИЖКА','Стрижка — это не просто необходимая процедура для основного ухода за волосами, а и способ выразить себя, отправная точка имиджа и стиля.','/assets/service4.png'),('SOENG','Tänu oma universaalsusele on soeng alati olnud populaarseim juuksuriteenus. Soengu tegemine sisaldab väga erinevad operatsioone, mis aitavad anda juustele soovitud vormi ja mahu.','УКЛАДКА','Укладка волос всегда остается популярной парикмахерской услугой в силу своей универсальности. Под укладкой подразумеваются самые разные операции, которые позволяют придать волосам нужную форму и объем.\n\n','/assets/service3.png'),('VÄRVIMINE','Juuste värvimine on juuksuriteenustest populaarsuselt järgmine. Talle on samuti omane pidev täiustumine ja areng.','ОКРАШИВАНИЕ','Окрашивание — вторая по популярности услуга, которая тоже постоянно эволюционирует и совершенствуется.\n\n','/assets/service1.png'),('STILIST','Kaasaegse elutempo juures pole stilisti teenus enam mitte luksus, vaid loomulik vajadus.\n\n\n','СТИЛИСТ','Для современных людей услуги стилиста – не роскошь, а необходимость в темпе повседневной жизни.\n\n','/assets/service2.png');
/*!40000 ALTER TABLE `about_services` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_services`
--

LOCK TABLES `appointment_services` WRITE;
/*!40000 ALTER TABLE `appointment_services` DISABLE KEYS */;
INSERT INTO `appointment_services` VALUES (1,2,3),(2,5,3),(3,1,3),(4,3,1),(5,4,2),(6,7,1),(8,3,35),(9,4,NULL),(10,6,NULL),(11,2,NULL),(12,5,NULL),(13,2,NULL),(14,5,NULL),(15,6,NULL),(16,4,NULL),(17,3,NULL),(18,7,NULL),(19,4,NULL),(20,5,NULL),(21,6,NULL),(22,1,NULL),(23,4,NULL),(24,6,NULL),(25,2,NULL),(26,5,NULL),(27,1,NULL),(28,4,NULL),(29,3,NULL),(30,7,NULL),(31,1,NULL),(32,4,NULL),(33,1,NULL),(34,2,NULL),(35,1,NULL),(36,2,NULL),(37,1,NULL),(38,2,NULL),(39,1,NULL),(40,2,NULL),(41,1,108),(42,2,108),(43,1,109),(44,2,109),(45,1,110),(46,2,110),(47,1,111),(48,3,112),(49,1,112),(50,1,113),(51,1,114),(52,1,115),(53,2,115),(54,5,115),(55,1,116),(56,5,116),(57,1,117),(58,5,117),(59,2,118);
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
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`slot_id`) REFERENCES `time_slots_old` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,2),(2,2,4),(3,3,5),(13,19,2),(14,21,2),(15,25,1),(16,26,3),(17,27,2),(18,29,4),(19,30,5),(20,31,5),(21,32,3),(22,33,1),(23,34,3),(24,38,3),(25,39,2),(26,40,3),(27,41,3),(28,42,4),(29,43,5),(30,44,3),(31,45,1),(32,46,4),(33,47,1),(34,48,2),(35,50,2),(36,51,1),(37,52,1),(38,53,3),(39,54,2),(40,55,1),(41,56,3),(42,75,NULL),(43,76,NULL),(44,77,NULL),(45,78,NULL),(46,80,NULL),(47,82,NULL),(48,83,NULL),(49,84,NULL),(50,85,NULL),(51,86,NULL),(52,87,NULL),(53,89,NULL),(54,91,NULL),(55,98,NULL),(56,110,NULL),(57,112,NULL),(58,113,NULL),(59,115,NULL),(60,138,NULL),(61,169,NULL),(62,181,NULL),(63,182,NULL),(64,183,NULL),(65,184,NULL),(66,185,NULL),(67,186,NULL),(68,188,NULL),(69,189,NULL),(70,228,NULL),(71,229,NULL),(72,230,NULL),(73,231,NULL),(74,232,NULL),(75,233,NULL),(76,234,NULL),(77,235,NULL),(78,236,NULL),(79,237,NULL),(80,238,NULL),(81,239,NULL),(82,240,NULL),(83,241,NULL),(84,242,NULL),(85,243,NULL),(86,244,NULL),(87,245,NULL),(88,246,NULL),(89,247,NULL),(90,248,NULL),(91,249,NULL),(92,250,NULL),(93,251,NULL),(94,252,NULL),(95,253,NULL),(96,254,NULL),(97,255,NULL),(98,256,NULL),(99,257,NULL),(100,258,NULL),(101,259,NULL),(102,260,NULL),(103,261,NULL),(104,262,NULL),(105,263,NULL),(106,264,NULL),(107,265,NULL),(108,266,NULL),(109,267,NULL),(110,268,NULL),(111,269,NULL),(112,270,NULL),(113,271,NULL),(114,272,NULL),(115,273,NULL),(116,274,NULL),(117,275,NULL),(118,276,NULL);
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
  `name` enum('Men','Women','Children','Material') NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men'),(2,'Women'),(3,'Children'),(4,'Material');
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
  `clientName` varchar(255) NOT NULL,
  `clientTel` varchar(20) NOT NULL,
  `clientEmail` varchar(255) DEFAULT NULL,
  `additional_info` text,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=277 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'John Doe','123-456-7890','',NULL),(2,'Jane Smith','987-654-3210','',NULL),(3,'Michael Johnson','555-555-5555','',NULL),(4,'n','n','n',NULL),(5,'j','j','j',NULL),(6,'daniil','555 ','',NULL),(7,'d','n','n',NULL),(8,'j','j','n',NULL),(9,'n','n','n',NULL),(10,'j','j','j',NULL),(11,'k','n','n',NULL),(12,'mj','j','j',NULL),(13,'j','j','jj',NULL),(14,'j','j','j',NULL),(15,'N','N','N',NULL),(16,'k','n','km',NULL),(17,'mN','k','j',NULL),(18,'j','j','j',NULL),(19,'j','j','j',NULL),(20,'k','k','k',NULL),(21,'n','n','n',NULL),(22,'m','m','m',NULL),(23,'n','n','n',NULL),(24,'j','j','j',NULL),(25,'j','j','j',NULL),(26,'k','k','k',NULL),(27,'j','j','j',NULL),(28,'k','k','k',NULL),(29,'j','j','j',NULL),(30,'n','n','n',NULL),(31,'n','n','n',NULL),(32,'j','j','j',NULL),(33,'m','m','m',NULL),(34,'m','m','m',NULL),(35,'m','m','m',NULL),(36,'m','m','m',NULL),(37,'k','k','k',NULL),(38,'n','n','n',NULL),(39,'n','n','n',NULL),(40,'j','j','j',NULL),(41,'hj','j','j',NULL),(42,'k','nj','k',NULL),(43,'test','test','test',NULL),(44,'Daniil','555','email',NULL),(45,'n','n','nn',NULL),(46,'Daniil','555','annelinn',NULL),(47,'Jhon','555','j@mail.ee',NULL),(48,'enw','123','ad',NULL),(49,'new name','123456','mail',NULL),(50,'test','12356','test mail',NULL),(51,'test','12','test1',NULL),(52,'1','1','1',NULL),(53,'nde','h','j',NULL),(54,'n','n','n',NULL),(55,'nj','nj','nj',NULL),(56,'n','j','j',NULL),(57,'working','m','mail',NULL),(58,'working?','test','test',NULL),(59,'e','e','e',NULL),(60,'John','0',NULL,NULL),(61,'undefined','0',NULL,NULL),(62,'TestName2','3',NULL,NULL),(63,'4ebur','4',NULL,NULL),(64,'appointmentsTest','231',NULL,NULL),(65,'appointmentsTest','222',NULL,NULL),(66,'one more time','00',NULL,NULL),(67,'NameT','8',NULL,NULL),(68,'testAppoint','3',NULL,NULL),(69,'yy','88',NULL,NULL),(70,'pp','0',NULL,NULL),(71,'tesst','123',NULL,NULL),(72,'typeof','1',NULL,NULL),(73,'parseint','21',NULL,NULL),(74,'typeofInt','2',NULL,NULL),(75,'new parse','12',NULL,NULL),(76,'final test for appointments','000',NULL,NULL),(77,'selectedservices','33',NULL,NULL),(78,'whar','12',NULL,NULL),(79,'w','123',NULL,NULL),(80,'w','123',NULL,NULL),(81,'worker2','999',NULL,NULL),(82,'working?','2',NULL,NULL),(83,'qq','123',NULL,NULL),(84,'NameO','0',NULL,NULL),(85,'watching','32',NULL,NULL),(86,'watching','21',NULL,NULL),(87,'watching','22',NULL,NULL),(88,'checking','13',NULL,NULL),(89,'worker1_','2',NULL,NULL),(90,'chatgpt','00',NULL,NULL),(91,'cloude','2',NULL,NULL),(92,'ppp','0',NULL,NULL),(93,'rere','1',NULL,NULL),(94,'woo','3',NULL,NULL),(95,'kkk','8',NULL,NULL),(96,'','',NULL,NULL),(97,'iii','0',NULL,NULL),(98,'w','123',NULL,NULL),(99,'who','000',NULL,NULL),(100,'worker21212','3',NULL,NULL),(101,'worker2oo','999',NULL,NULL),(102,'oooo','999',NULL,NULL),(103,'iui','999',NULL,NULL),(104,'ytete','3',NULL,NULL),(105,'w','',NULL,NULL),(106,'w','0',NULL,NULL),(107,'qwerty','122',NULL,NULL),(108,'qwertyu','999',NULL,NULL),(109,'w','3',NULL,NULL),(110,'ytyt','3223',NULL,NULL),(111,'ii','999',NULL,NULL),(112,'oiu','21',NULL,NULL),(113,'work?','333',NULL,NULL),(114,'w','3',NULL,NULL),(115,'here','123',NULL,NULL),(116,'Karl','000',NULL,NULL),(117,'','',NULL,NULL),(118,'','',NULL,NULL),(119,'','',NULL,NULL),(120,'','',NULL,NULL),(121,'jj','999',NULL,NULL),(122,'','undefined',NULL,NULL),(123,'work?','12',NULL,NULL),(124,'conflict?','22',NULL,NULL),(125,'pp','123',NULL,NULL),(126,'opp','00',NULL,NULL),(127,'undefined','undefined',NULL,NULL),(128,'undefined','undefined',NULL,NULL),(129,'undefined','undefined',NULL,NULL),(130,'undefined','undefined',NULL,NULL),(131,'','',NULL,NULL),(132,'','',NULL,NULL),(133,'','',NULL,NULL),(134,'is it?','444',NULL,NULL),(135,'Jane','3838',NULL,NULL),(136,'uwuw','123',NULL,NULL),(137,'new one','434',NULL,NULL),(138,'testApp','333',NULL,NULL),(139,'oneMoreTest','555',NULL,NULL),(140,'withoutA','123312',NULL,NULL),(141,'totalyWithout','444',NULL,NULL),(142,'qwqwq','111',NULL,NULL),(143,'worker11','1212',NULL,NULL),(144,'eewe','2',NULL,NULL),(145,'ewewwq','3',NULL,NULL),(146,'Name','22',NULL,NULL),(147,'client','33',NULL,NULL),(148,'nikita','3333',NULL,NULL),(149,'rrr','223',NULL,NULL),(150,'headers','33',NULL,NULL),(151,'AppointTest','22',NULL,NULL),(152,'uuu','8',NULL,NULL),(153,'mhm?','22',NULL,NULL),(154,'one','2',NULL,NULL),(155,'ee','33',NULL,NULL),(156,'k','333',NULL,NULL),(157,'n','7',NULL,NULL),(158,'hjh','999',NULL,NULL),(159,'NameQ','999',NULL,NULL),(160,'qwq','3',NULL,NULL),(161,'sec','21',NULL,NULL),(162,'ewq','123',NULL,NULL),(163,'ewq','123',NULL,NULL),(164,'qwqwqwq3','323',NULL,NULL),(165,'qwqwqwq3','323',NULL,NULL),(166,'wqs','23',NULL,NULL),(167,'wqs','23',NULL,NULL),(168,'so?','3223',NULL,NULL),(169,'one more yim','2332',NULL,NULL),(170,'chak','2111',NULL,NULL),(171,'oop','323',NULL,NULL),(172,'yy','33',NULL,NULL),(173,'io','22',NULL,NULL),(174,'tom','123',NULL,NULL),(175,'ii8','9',NULL,NULL),(176,'one','23',NULL,NULL),(177,'Ira','123',NULL,NULL),(178,'io','4',NULL,NULL),(179,'w','999',NULL,NULL),(180,'qwer','1232',NULL,NULL),(181,'ooo','234',NULL,NULL),(182,'testP','23',NULL,NULL),(183,'Name','3',NULL,NULL),(184,'uuuu','0000',NULL,NULL),(185,'kkk','0',NULL,NULL),(186,'Some name','232',NULL,NULL),(187,'Daniil','000',NULL,NULL),(188,'Daniil','222',NULL,NULL),(189,'who','12',NULL,NULL),(190,'debee','2341','mail@m.ee',NULL),(191,'hp','9009','d@m.ee',NULL),(192,'dell','00','d@m.ee',NULL),(193,'then','90909','mail@m.ee',NULL),(194,'ioop','0','',NULL),(195,'client who can','8484','d@m.ee',NULL),(196,'valandemor','999','lebowski@gmail.com',NULL),(197,'valandemor','999','lebowski@gmail.com',NULL),(198,'men','33','',NULL),(199,'success?','1234','',NULL),(200,'carnaval','13434','',NULL),(201,'result','222','',NULL),(202,'jhjh','2345','',NULL),(203,'q','2','',NULL),(204,'id','33','',NULL),(205,'Frank','9339','',NULL),(206,'NameU','3','',NULL),(207,'antony','888','a@mail.ee',NULL),(208,'rrr','33','',NULL),(209,'worker22112','45','',NULL),(210,'appntTest','001','d@m.ee',NULL),(211,'opyre','','',NULL),(212,'Nameeee','32','',NULL),(213,'new year','999','',NULL),(214,'w','','',NULL),(215,'ttt','3232','',NULL),(216,'ölö','123','',NULL),(217,'worker2','','',NULL),(218,'sas','999','',NULL),(219,'klkl','','',NULL),(220,'ssa','123','',NULL),(221,'clientID','','',NULL),(222,'bb','222','',NULL),(223,'dataa','889','',NULL),(224,'last','3232','',NULL),(225,'ioio','89','',NULL),(226,'clientIdTest','000','',NULL),(227,'Daron','666','daron4ik@gmail.ee',NULL),(228,'Daron4k','444','d@m.ee',NULL),(229,'Serj','666','serj@mail.ee',NULL),(230,'ppö','12','',NULL),(231,'ll','','',NULL),(232,'newErr','00','',NULL),(233,'newErrWorker2','2','',NULL),(234,'fix?','3','',NULL),(235,'workererr','3','',NULL),(236,'calid','','',NULL),(237,'so?','2222','',NULL),(238,'\'\'\'\'\'\'\'\'\'','1221','',NULL),(239,'selected','','',NULL),(240,'app id','33','',NULL),(241,'AI','222','',NULL),(242,'new run','2','',NULL),(243,'mn','','',NULL),(244,'lll','3','',NULL),(245,'we','','',NULL),(246,'mmm','','',NULL),(247,'uyuy','3','',NULL),(248,'wasd','22','',NULL),(249,'is it ok?','333','',NULL),(250,'timo','','',NULL),(251,'chack','666','',NULL),(252,'soad','333','',NULL),(253,'ids','5455','d@m.ee',NULL),(254,'333','','',NULL),(255,'who','333','',NULL),(256,'shavo','333','',NULL),(257,'eer','321','',NULL),(258,'okei','','',NULL),(259,'await','','',NULL),(260,'chatgpt','3','',NULL),(261,'qwwqw','','',NULL),(262,'Ben','222','',NULL),(263,'rrr','123','',NULL),(264,'ioio','22','',NULL),(265,'appointment_id','333','',NULL),(266,'soad','333','',NULL),(267,'tarmo','22','',NULL),(268,'Timo','21212','t@mail.ee',NULL),(269,'jelenaWorker','90','d@m.ee',NULL),(270,'maritest','555555555','d@m.ee',NULL),(271,'miller','333','',NULL),(272,'jelena13','22','',NULL),(273,'Sara','55500011','sara@mail.ee',NULL),(274,'John Doe','123456','j@mail.ee',NULL),(275,'smith','123567','d@m.ee',NULL),(276,'jjjj','','',NULL);
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
  `appointment_services_id` int DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  UNIQUE KEY `invoice_invoice_id_uindex` (`invoice_id`),
  KEY `fk_appointment_services` (`appointment_services_id`),
  CONSTRAINT `fk_appointment_services` FOREIGN KEY (`appointment_services_id`) REFERENCES `appointment_services` (`appointment_services_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,90.00,NULL);
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
  `et` varchar(250) DEFAULT NULL,
  `ru` varchar(250) DEFAULT NULL,
  `is_additional_material` tinyint(1) NOT NULL,
  `is_price_range` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `section_id` (`category_id`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,1,'Stiili muutmine',60,10.00,'Stiili muutmine','Изменение стиля',0,0),(2,1,'Habeme kujundamine',15,17.00,'Habeme kujundamine','Формирование бороды',0,0),(3,1,'Lõikus kääridega',45,20.00,'Lõikus kääridega','Стрижка ножницами',0,0),(4,1,'Masinalõikus',30,30.00,'Masinalõikus','Машинная стрижка',0,0),(5,1,'Kompleksteenusteenus keemiline lokk +lõikus',105,30.00,'Kompleksteenusteenus keemiline lokk +lõikus','Комплексная услуга химическая завивка + стрижка',1,0),(6,1,'Juuste pesemine / soeng',30,25.00,'Juuste pesemine/soeng','Мытье волос / укладка',0,0),(7,1,'Värvimine / toonimine',75,43.00,'Värvimine/toonimine','Окрашивание / тонирование',1,0),(27,3,'Kuni 12-aastasele Lõikus',30,35.00,'Kuni 12-aastasele Lõikus','Стрижка для детей до 12 лет',0,0),(28,3,'Kuni 12-aastasele Soeng',60,15.00,'Kuni 12-aastasele Soeng','Прическа для детей до 12 лет',0,0),(29,2,'Lõikus kuumade kääridega',90,10.00,'Lõikus kuumade kääridega','Стрижка горячими ножницами',0,1),(30,2,'Lõikus',60,35.00,'Lõikus','Стрижка',0,1),(31,2,'Stiili muutmine',60,16.00,'Stiili muutmine','Изменение стиля',0,1),(32,2,'Tuka lõikus',15,20.00,'Tuka lõikus','Стрижка челки',0,0),(33,2,'Föönisoeng',60,40.00,'Föönisoeng','Укладка феном',0,1),(34,2,'Lokkimine',1,29.00,'Lokkimine','Создание локонов',0,1),(35,2,'Pruudisoeng',90,35.00,'Pruudisoeng','Свадебная причёска',0,0),(36,2,'Juuste pesu ja föönitamine',60,7.00,'Juuste pesu ja föönitamine','Мытье волос и укладка феном',0,0),(37,2,'Juurte värvimine',90,35.00,'Juurte värvimine','Окрашивание корней',1,0),(38,2,'Salgud',120,25.00,'Salgud','Шатуны',0,0),(39,2,'Kompleksteenus paksudele juustele: lõikus + värvimine',165,50.00,'Kompleksteenus paksudele juustele: lõikus + värvimine','Комплексное обслуживание для густых волос: стрижка + окрашивание',0,0),(40,2,'Kompleksteenus õhukestele juustele: lõikus + värvimine',135,18.00,'Kompleksteenus õhukestele juustele: lõikus + värvimine','Комплексное обслуживание для тонких волос: стрижка + окрашивание',0,0),(41,2,'Intensiivhooldus + massaaž',60,35.00,'Intensiivhooldus + massaaž','Интенсивный уход + массаж',0,1),(42,2,'Pea massaaž 10 min',30,44.00,'Pea massaaž 10 min','Массаж головы 10 минут',0,0),(43,2,'Kompleksteenus keemiline lokk + lõikus',105,35.00,'Kompleksteenus keemiline lokk + lõikus','Комплексное обслуживание химическая завивка + стрижка',1,0),(44,2,'Kompleksteenus õhukestele juustele volüüm/keemiline lokk juustele+ löikus',95,44.00,'Kompleksteenus õhukestele juustele volüüm/keemiline lokk juustele+ löikus','Комплексное обслуживание для тонких волос: объем/химическая завивка волос + стрижка',0,0),(45,2,'Kompleksteenus paksudele juustele volüümm/keemiline lokk juustele + löikus',135,35.00,'Kompleksteenus paksudele juustele volüümm/keemiline lokk juustele + löikus','Комплексное обслуживание для густых волос: объем/химическая завивка волос + стрижка',0,0),(46,4,'Värv',0,8.00,'Värv','Окрашивание',0,0),(47,4,'Goldwell Elumen',0,7.00,'Goldwell Elumen','Goldwell Elumen',0,0),(48,4,'Milk Shake',0,7.00,'Milk Shake','Milk Shake',0,0);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_appointment`
--

DROP TABLE IF EXISTS `test_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id_fk` (`client_id`),
  CONSTRAINT `client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_appointment`
--

LOCK TABLES `test_appointment` WRITE;
/*!40000 ALTER TABLE `test_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_slot`
--

DROP TABLE IF EXISTS `time_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slot` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slot`
--

LOCK TABLES `time_slot` WRITE;
/*!40000 ALTER TABLE `time_slot` DISABLE KEYS */;
INSERT INTO `time_slot` VALUES (1,'2023-12-03 15:55:17','2023-12-03 17:55:31'),(2,'2023-12-05 19:00:00','2023-12-05 19:30:00'),(3,'2023-12-05 19:30:00','2023-12-05 20:00:00'),(4,'2023-12-05 20:30:00','2023-12-05 21:00:00'),(5,'2023-12-03 23:45:00','2023-12-04 00:15:00'),(6,'2023-12-04 02:00:00','2023-12-04 02:30:00'),(7,'2023-12-04 01:30:00','2023-12-04 02:00:00'),(8,'2023-12-04 01:00:00','2023-12-04 01:30:00'),(9,'2023-12-04 02:30:00','2023-12-04 03:00:00'),(10,'2023-12-04 03:00:00','2023-12-04 03:30:00'),(11,'2023-12-04 04:00:00','2023-12-04 04:30:00'),(12,NULL,NULL);
/*!40000 ALTER TABLE `time_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_slots_old`
--

DROP TABLE IF EXISTS `time_slots_old`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slots_old` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `date_id` int DEFAULT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `date_id` (`date_id`),
  CONSTRAINT `time_slots_old_ibfk_1` FOREIGN KEY (`date_id`) REFERENCES `dates` (`date_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slots_old`
--

LOCK TABLES `time_slots_old` WRITE;
/*!40000 ALTER TABLE `time_slots_old` DISABLE KEYS */;
INSERT INTO `time_slots_old` VALUES (1,1,'10:00:00'),(2,1,'11:00:00'),(3,2,'14:00:00'),(4,2,'15:00:00'),(5,3,'09:00:00'),(6,1,'16:00:00');
/*!40000 ALTER TABLE `time_slots_old` ENABLE KEYS */;
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

-- Dump completed on 2023-12-26 12:23:02
