-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dbdecaps
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblbranch`
--

DROP TABLE IF EXISTS `tblbranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblbranch` (
  `branchID` int(11) NOT NULL AUTO_INCREMENT,
  `branchname` varchar(45) DEFAULT NULL,
  `branchstreetnum` int(11) DEFAULT NULL,
  `branchstreetname` varchar(100) DEFAULT NULL,
  `branchcity` varchar(100) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`branchID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO `tblbranch` VALUES (14,'A-team Pasig',11,'Concepcion St','Pasig City',29),(15,' A-team Muntinlupa',14,' Plaza Street',' Muntinlupa City',30);

--
-- Table structure for table `tblcat`
--

DROP TABLE IF EXISTS `tblcat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcat` (
  `membershipID` int(11) NOT NULL AUTO_INCREMENT,
  `membershipdesc` varchar(200) DEFAULT NULL,
  `membershipname` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`membershipID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcat`
--

INSERT INTO `tblcat` VALUES (4,'  The Client is allowed to visit and use the gym equipment in all of our branches nationwide','  Interbranch',1);

--
-- Table structure for table `tblclass`
--

DROP TABLE IF EXISTS `tblclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblclass` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL,
  `classdesc` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` VALUES (3,'  Zumbas','  Dancing that may increase your cardiovascular endurance',1);

--
-- Table structure for table `tblfacilities`
--

DROP TABLE IF EXISTS `tblfacilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfacilities` (
  `facilitiesID` int(11) NOT NULL AUTO_INCREMENT,
  `facilitiesname` varchar(45) NOT NULL,
  `fee` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `UOM` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`facilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` VALUES (1,'Washroom',100,24,'hr');

--
-- Table structure for table `tblprogram`
--

DROP TABLE IF EXISTS `tblprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblprogram` (
  `progid` int(11) NOT NULL AUTO_INCREMENT,
  `progname` varchar(45) NOT NULL,
  `progdesc` varchar(200) NOT NULL,
  PRIMARY KEY (`progid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblprogram`
--

INSERT INTO `tblprogram` VALUES (1,'boxing','suntukan'),(2,'taekwando','sipaan'),(3,'MMA','mixed martial arts'),(4,'Brazillian Jujitsu','Grappling and Take Downs');

--
-- Table structure for table `tblpromo`
--

DROP TABLE IF EXISTS `tblpromo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpromo` (
  `promoID` int(11) NOT NULL AUTO_INCREMENT,
  `promoname` varchar(45) DEFAULT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `statusback` int(11) DEFAULT NULL,
  PRIMARY KEY (`promoID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO `tblpromo` VALUES (4,'  Summer Promo','  08/11/2018','  08/18/2018',5,'Active',1),(5,'Ramadan Promo','04/11/2018','04/28/2018',10,'Active',2);

--
-- Table structure for table `tblspecial`
--

DROP TABLE IF EXISTS `tblspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblspecial` (
  `specialID` int(11) NOT NULL AUTO_INCREMENT,
  `specialname` varchar(45) DEFAULT NULL,
  `specialdesc` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`specialID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO `tblspecial` VALUES (4,'  Boxing','  A Sport that requires speed, stamina and power',1);

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `userfname` varchar(45) DEFAULT NULL,
  `userlname` varchar(45) DEFAULT NULL,
  `useremail` varchar(100) DEFAULT NULL,
  `userpassword` varchar(20) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `memclass` int(11) DEFAULT NULL,
  `memtype` int(11) DEFAULT NULL,
  `profile` varchar(100) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `usermobile` varchar(45) DEFAULT NULL,
  `useraddress` varchar(100) DEFAULT NULL,
  `usergender` varchar(45) DEFAULT NULL,
  `userschedule` varchar(100) DEFAULT NULL,
  `userbday` varchar(50) DEFAULT NULL,
  `specialization` int(11) DEFAULT NULL,
  `statusfront` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `branch_idx` (`branch`),
  KEY `specialization_idx` (`specialization`),
  CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specialization` FOREIGN KEY (`specialization`) REFERENCES `tblspecial` (`specialID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` VALUES (9,NULL,NULL,'admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Jon','Balmaceda','Balmaceda@gmail.com',NULL,4,NULL,NULL,NULL,14,'+639635241989',NULL,NULL,NULL,NULL,NULL,'Active'),(30,'Carlo','Doronila','Doro@gmail.com',NULL,4,NULL,NULL,NULL,15,'+639635241989',NULL,NULL,NULL,NULL,NULL,'Active'),(31,'Rafhael','Pabustan','pb@gmail.com',NULL,4,NULL,NULL,NULL,NULL,'+639526396854',NULL,NULL,NULL,NULL,NULL,'Inactive'),(32,'   Jethro','   Samson','jeth@gmail.com',NULL,3,NULL,NULL,NULL,14,'   +639856478120','   80 Plaza St , Sta Mesa Manila','male','Monday,Tuesday,Sunday','   08/01/2008',4,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
