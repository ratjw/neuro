-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: neurosurgery
-- ------------------------------------------------------
-- Server version	5.7.25-log

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
-- Table structure for table `resident`
--

DROP TABLE IF EXISTS `resident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resident` (
  `ramaid` varchar(6) DEFAULT NULL,
  `residentname` varchar(255) DEFAULT NULL,
  `enrollyear` varchar(4) DEFAULT NULL,
  `research` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resident`
--

LOCK TABLES `resident` WRITE;
/*!40000 ALTER TABLE `resident` DISABLE KEYS */;
INSERT INTO `resident` VALUES ('134515','5435135','2557','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546529','6562656','2559','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546469','546546','2560','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('356471','5646426','2561','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('624572','45652626','2562','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('134520','5435135','2558','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546534','6562656','2559','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546474','546546','2560','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('356476','5646426','2561','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('624577','45652626','2562','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('134525','5435135','2558','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546539','6562656','2559','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546479','546546','2560','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('356481','5646426','2561','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('624582','45652626','2562','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('134530','5435135','2558','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546544','6562656','2559','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('546484','546546','2560','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('356486','5646426','2561','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('624587','45652626','2562','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('111111','222 22222','2556','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}'),('001111','333 33333','2556','{\"ethic\": 160, \"data50\": 300, \"data100\": 200, \"analysis\": 100, \"complete\": 10, \"planning\": 200, \"proposal\": 40, \"conclusion\": 90}');
/*!40000 ALTER TABLE `resident` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-26 15:49:28
