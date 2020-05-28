-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: neurosurgery
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `profile` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'{\"start\": {}, \"oncall\": 1, \"ramaid\": \"004415\", \"staffname\": \"เธญ.เน€เธญเธ\"}',1,'เธญ.เน€เธญเธ','004415','neurosurgery',1,NULL),(2,'{\"start\": {}, \"oncall\": 2, \"ramaid\": \"003391\", \"exchange\": {\"2020-05-09\": {\"1583196674683\": \"000000\"}}, \"staffname\": \"เธญ.เธญเธฑเธ•เธ–เธเธฃ\"}',2,'เธญ.เธญเธฑเธ•เธ–เธเธฃ','003391','neurosurgery',1,NULL),(3,'{\"start\": {}, \"oncall\": 3, \"ramaid\": \"007841\", \"exchange\": {\"2020-05-09\": {\"1583217731098\": \"000000\"}}, \"staffname\": \"เธญ.เธชเธฃเธขเธธเธ—เธ\"}',3,'เธญ.เธชเธฃเธขเธธเธ—เธ','007841','neurosurgery',1,NULL),(4,'{\"start\": {}, \"oncall\": 4, \"ramaid\": \"008146\", \"exchange\": {\"2020-02-29\": {\"1583222491326\": \"000000\", \"1583222741094\": \"000000\"}}, \"staffname\": \"เธญ.เธงเธฑเธ’เธเธฒ\"}',4,'เธญ.เธงเธฑเธ’เธเธฒ','008146','neurosurgery',1,NULL),(5,'{\"start\": {}, \"oncall\": 5, \"ramaid\": \"004606\", \"exchange\": {\"2020-02-22\": {\"1583222499239\": \"000000\"}, \"2020-02-29\": {\"1583222658422\": \"000000\"}, \"2020-04-18\": {\"1583196656277\": \"000000\"}}, \"staffname\": \"เธญ.เน€เธเธฃเธตเธขเธเธจเธฑเธเธ”เธดเน\"}',5,'เธญ.เน€เธเธฃเธตเธขเธเธจเธฑเธเธ”เธดเน','004606','neurosurgery',1,NULL),(6,'{\"start\": {}, \"oncall\": 0, \"ramaid\": \"006599\", \"staffname\": \"เธญ.เธเธตเธฃเธเธเธจเน\"}',6,'เธญ.เธเธตเธฃเธเธเธจเน','006599','neurosurgery',0,NULL),(7,'{\"skip\": {}, \"start\": {\"1583195397\": \"2019-12-14\"}, \"oncall\": 6, \"ramaid\": \"006805\", \"exchange\": {\"2020-04-18\": {\"1583217714187\": \"000000\"}}, \"staffname\": \"เธญ.เธจเธดเธฃเธดเธงเธธเธ’เธด\"});
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28  6:48:33
