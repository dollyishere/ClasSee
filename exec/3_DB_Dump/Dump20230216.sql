-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: classee
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `hit` bigint DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbc2qerk3l47javnl2yvn51uoi_idx` (`user_id`),
  CONSTRAINT `FKbc2qerk3l47javnl2yvn51uoi` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_frir1w2v8n1df8jgri5mox179` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'12@12.com','8d9dbd3e5fbb3ff55a1351d248dd4ca69409415c371a3041229d20e29cfce3ba',NULL,'241ceef0558504d6',NULL,'LOCAL'),(3,'ttest@gmail.com','c9ffb4f6a0a8bbee4202c62bd1eabdecdc992e8c34fec3e96b1411e845d8ac39',NULL,'c5f08e22d1687c4c',NULL,'LOCAL'),(4,'11@11.com','e0159809d4756aff8000210ff484a0ca48e8b44c2556b21d66343ea05cff8fa1',NULL,'7cb4bf84610ebc60',NULL,'LOCAL'),(5,'admin@clas.see','48a7ae2d01eba2a494d3c8f484e70a468524b4d3c75ef8817b643b7da99388b3',NULL,'185e894e261c2471',NULL,'LOCAL'),(6,'rlawnsgh8395@naver.com','33ed0160a67e25281b4d728261109bc03be5fd708229499fe74d460c527005e9',NULL,'485143f794092308',NULL,'LOCAL'),(7,'april2nd@april.com','13e8e394728799d5ce8c642c1c429e45be0db0b061ad2ef31ad03061480fc683',NULL,'856a55023b747cef',NULL,'LOCAL'),(9,'naver@naver.com','25febd19130372600396a0bb1e22e564deb6d2616110518afb76c1c304afbbd5',NULL,'b5f7cfc223708031',NULL,'LOCAL'),(10,'ksko8053@naver.com','e23b69d4ffe9f6d104f856cd8841c12637fa0650ff80a99445adbd7ee3b4a95d',NULL,'06a82516b3a791c7',NULL,'LOCAL'),(11,'test@ssafy.com','786cc604ce6e96c52de7c837a489ca8246f677a738367c4daec95ec6ab936090',NULL,'ffaed8d9409af3ed',NULL,'LOCAL'),(12,'test1@ssafy.com','9b94d6b799db7ea4d4622cb853c407f6d26beea59e29141a409ca9c152680fb4',NULL,'4e8fcdf92d518fb7',NULL,'LOCAL'),(13,'test2@ssafy.com','35f621ad6e92fafa7d5d341ce1d64ea8cdad7eb4a4b7a084beba5065c4efb56b',NULL,'159b34273e8ed0b2',NULL,'LOCAL'),(14,'test3@ssafy.com','a068121a776a992e5ced52c2a14abfbc5c9e5fed9dbfb7c547a628420b54278f',NULL,'df3f6f9d59c9318e',NULL,'LOCAL'),(15,'test4@ssafy.com','3f59b0979d9492842529586fbb5869a4ff0e2e8bbfdfada2b4595febc0456708',NULL,'9dc732a191ce7e7b',NULL,'LOCAL'),(16,'test5@ssafy.com','55ef40c77d04a9eaa543f519fdec6e160f57072369d694d4e307effa9911dd0e',NULL,'edaf6fe92604ace8',NULL,'LOCAL'),(17,'test1234@gmail.com','04c86e444e37666bf0492c95db9efc20ca722af968eb71133d45fc176ddccb7c',NULL,'a5c7f0db906dbbc9',NULL,'LOCAL'),(20,'admin@admin.com','75080fb3776d2fe0df1ecda09027212a18eb0c0d2332a99d35ff3d62b563949e',NULL,'f39d27d21e83d5f5',NULL,'LOCAL'),(21,'test@test.com','01dfc06b427de20600beec9717b414b17aefafdf050b25f5b27d7f186be13619',NULL,'f345fa2040ec804b',NULL,'LOCAL'),(22,'suribap@naver.com','ae256b7d540b0a1eece372e4cba2281868f9d230211e06b96585c1c15d970a99',NULL,'e42bb32df7599d74',NULL,'LOCAL'),(26,'google@google.com','153f5b4e12b84100f7f3c99277a319fb827e4118222551452c5920172e73121a',NULL,'63ac034b9d7a505c',NULL,'LOCAL'),(31,'rlawnsgh8395@gmail.com','a3a39c4e5a1283ac21567e090c203d2f1922ee8c599b94a883a6518798bbff54',NULL,'5824a1613aea5c88',NULL,'LOCAL'),(32,'unknownflowers@naver.com','9b2fa123b8f4f8b54d1c41f60160299336fa6fb51cbd9c8ab15367be4a6d9e56',NULL,'790d5c6677dbedd1',NULL,'LOCAL'),(33,'ho7unkim@github.com','0283c0fc5c05f2311778aa8403091f11cb4737db498af07bf2880a676eaac81a',NULL,'2af696c42ad7ddcc',NULL,'LOCAL'),(34,'back@back.com','7511a6f9a066f7c5daf62db9a9c315317b4a821abfd805d68111fe2fc8b07852',NULL,'f71865bc78ae87bf',NULL,'LOCAL'),(35,'yoga@test.com','7614bfbb021e896263a2e8e79c18f54515f9baf4e05bba60dd36fef311fd83ea',NULL,'3b33dfb41962df84',NULL,'LOCAL'),(36,'gym@test.com','36819c10661ae23ba77cf73c256cd8f2fc0dcacd5c6b83fee29a3f0ecf116537',NULL,'587716bb6da150dd',NULL,'LOCAL'),(37,'drum@test.com','624e3e509d2db9e79d82a281fdedbf72c03854df3fea9db6f1c17d7290d48f49',NULL,'8c47171dee4b7d26',NULL,'LOCAL'),(38,'ddd@ddd.com','81dc9b582eb12dfdbd2371ae5d8f4b92832c8f41ba62b20454e11367ccb60963',NULL,'d912a1becbdcdd4b',NULL,'LOCAL'),(39,'thereisnotruth12@gmail.com',NULL,NULL,NULL,NULL,'KAKAO'),(40,'dolpong_@naver.com',NULL,NULL,NULL,NULL,'KAKAO'),(41,'armitage@naver.com','31dbead3c428a736d8e6ee5da6f912df2daa3f8c388ea92d82d6334e2dd77fce',NULL,'69569f465b2e15bf',NULL,'LOCAL'),(42,'13@13.com','b84c9882a41773645ce4ab9affbb626d553a8ae161c41607ffb809f44082686a',NULL,'f7a999e1976a98fa',NULL,'LOCAL'),(43,'efef@eawfef.com','238cb44a1bc134506106cfa615f34009db261ecb425369246177a1ff024043a8',NULL,'ac4f3d4bf2994e6f',NULL,'LOCAL'),(44,'unagi11@kakao.com',NULL,NULL,NULL,NULL,'KAKAO'),(46,'No8@ssafy.com','5d0bfa140f3846c09562f077391959919a758112898f4801b6d43df772a93936',NULL,'604235ef75e77bd1',NULL,'LOCAL'),(47,'iu@iu.com','4c7b1393d63a00af3e1a441e537aee8eb8e1060da4a11025bd000a5cc396927d',NULL,'deaae686df6e2db0',NULL,'LOCAL'),(48,'flower@naver.com','90a3e5b14ae20e7fbe8e734808afa7dc09ae388ee54098a0fde9509566bfaec2',NULL,'d1cd96a959e77868',NULL,'LOCAL'),(49,'leather@leather.com','b26bc1cc84882c910e2142ed746e4829120cc515c93d149ddea42a2ef9726a7d',NULL,'63a3866e2ce8c0d2',NULL,'LOCAL'),(50,'makeup@test.com','90ff54906b6afa87c84cda0d43957e996aec98361eb870794dfc2ee703fd559f',NULL,'0f9adfe3d9624944',NULL,'LOCAL'),(51,'tart@tart.com','c0c1d6000fb8f93db90c0b44306848916d1852c427cb34fcf3ddb862e3eaa292',NULL,'222b534affc8f7d8',NULL,'LOCAL'),(52,'bob@test.com','93a57f779f26f3ae47a7a71a37acd7650c15673360be981524338720f3db4b73',NULL,'55a3e66ef72a06ff',NULL,'LOCAL'),(53,'vlog@test.com','9b9e3f9ea8a0ab5059386359507957f01b13d9335662b381ac91e18e11df2718',NULL,'6562baec863136bb',NULL,'LOCAL'),(54,'perfume@perfume.com','c02787f86888b03790873b6e3e9f8fd24a637aad0193f84849ca8db704c463f4',NULL,'2f67c03ae11ff8bf',NULL,'LOCAL'),(55,'nando@test.com','54683a05dfc5e8fd2683473a8f67c8d5056cafde2ccbf81676d5811f4583f04c',NULL,'777a873346b5a504',NULL,'LOCAL'),(56,'sim@test.com','732d0676467353144ebba1080471eeb58642b8dc10e6471d58bdad5599902842',NULL,'9d94d7a8056fe076',NULL,'LOCAL'),(57,'freedum@test.com','bb75d301d813db8ccca9f0f549b3247656c6fa6d1093d52ce4d9aa039bec2a98',NULL,'73ced9360ce8c456',NULL,'LOCAL'),(58,'looop@test.com','b4c7c6b9bf56bc043aa0a9f978e40f37b2d8efe0c94cf460dbd52cb02275d0c7',NULL,'fd13ab1bd1792b4f',NULL,'LOCAL'),(59,'dryflower@test.com','45e3551bac6b5449c3afaf2d39fb25d55bee7e344ecca9d3b6a86a4abf56a377',NULL,'84936250f3451b38',NULL,'LOCAL'),(60,'huger@test.com','b4de4dded0cdfec510d50d34de5001b3244c7a0576b254c39a520d4e3cf808dc',NULL,'4ce07ff39f6f1a23',NULL,'LOCAL'),(61,'GR@test.com','e745c41959694ce3350403842362237b586b12970cf526b6bcd560addc8a3cca',NULL,'9e508e87d164c977',NULL,'LOCAL');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3ogdxsxa4tx6vndyvpk1fk1am_idx` (`user_id`),
  KEY `FK8cbbfijq14fpfjmvtqd6ocwxj` (`lesson_id`),
  CONSTRAINT `FK3ogdxsxa4tx6vndyvpk1fk1am` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK8cbbfijq14fpfjmvtqd6ocwxj` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (24,3,1),(43,5,4),(61,5,3),(64,6,3),(119,5,21),(122,25,32),(124,4,33),(130,28,33),(136,29,21),(141,4,3),(142,31,35),(154,34,37),(155,3,37),(156,5,37),(157,26,37),(158,3,3),(159,30,6),(160,5,39),(172,4,6),(174,6,6),(180,3,46),(181,5,17),(182,30,17),(183,3,17),(184,26,17),(185,4,17),(195,50,17);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp9s74oq5uwoxpad8abl8nm85o` (`lesson_id`),
  CONSTRAINT `FKp9s74oq5uwoxpad8abl8nm85o` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
INSERT INTO `checklist` VALUES (10,'lesson5_checklist1.jpg',5),(11,'lesson5_checklist2.jpg',5),(12,'lesson5_checklist3.jpg',5),(15,'pumpkins-1009197__340.jpg',NULL),(21,'cat2.jpg',NULL),(22,'knitting-1430153__340.jpg',3),(23,'dyed-4698439__340.jpg',3),(36,'lesson2_profile.jfif',4),(37,'lesson1_checklist2.jfif',4),(38,'4a13719dfe7940618c02ec846cd16c08_1080.jpg',25),(40,'다운로드.jfif',28),(46,'4e9794071b394da6b949eb7be2efa7a1_1080.jpg',29),(47,'76a23d04061e4e1880ff5be7e91c06ab_1080.jpg',29),(48,'5599c5fbaffb435cac109f713b3ad18c_1080.jpg',29),(49,'281874005c5b4703929955f35ba392da_1080.jpg',29),(50,'adf68c7c0c024089894979c275e7e127_1080.jpg',29),(51,'check.jfif',32),(52,'다운로드.jpg',NULL),(53,'stick.jfif',34),(58,'flowersicssor.jpg',37),(59,'flotape.jpg',37),(60,'flowerfoam.jpg',37),(61,'checklist.jpg',38),(62,'leatherkit.jpg',39),(63,'checklist.webp',40),(66,'checklist.webp',42),(67,'checklist2.jpg',42),(73,'oven.jpg',44),(74,'cook.jpg',44),(75,'oven.jpg',41),(76,'cook.jpg',41),(77,'vllo.jpg',45),(78,'vita.webp',45),(79,'git.jpeg',46),(80,'cat-5183427__480.jpg',NULL),(81,'checklist.webp',51),(82,'checklist2.webp',51),(83,'profile2.webp',52),(94,'checklist.jpg',53),(99,'checklist1.png',54),(101,'Group 198 (1).png',NULL),(103,'teacher_profile.webp',NULL),(109,'Group 198 (1).png',66);
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `level` bigint DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `step` bigint DEFAULT NULL,
  `article_id` bigint DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5yx0uphgjc6ik6hb82kkw501y` (`article_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  KEY `FKde3rfu96lep00br5ov0mdieyt` (`parent_id`),
  CONSTRAINT `FK5yx0uphgjc6ik6hb82kkw501y` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKde3rfu96lep00br5ov0mdieyt` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum`
--

DROP TABLE IF EXISTS `curriculum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  `stage` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr9lufsjxahdl4haqrrb1lo7rh` (`lesson_id`),
  CONSTRAINT `FKr9lufsjxahdl4haqrrb1lo7rh` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum`
--

LOCK TABLES `curriculum` WRITE;
/*!40000 ALTER TABLE `curriculum` DISABLE KEYS */;
INSERT INTO `curriculum` VALUES (13,'프로그램 툴 익히기',5,0),(14,'러프한 스케치하기',5,1),(15,'라인스케치와 채색하기',5,2),(20,'sadg',NULL,0),(21,'asdg',NULL,1),(29,'ㅎㅎㅎ',NULL,0),(30,'ㅂㅂㅂ',NULL,1),(31,'하이하이',3,0),(32,'실과 바늘을 준비해보렴',3,1),(33,'어때요 참 쉽죠?',3,2),(48,'베이스 기초 이론',4,0),(49,'코드, 스케일 이론',4,1),(50,'01. 마음을 담아 쓰는 붓펜 캘리그래피',25,0),(51,'02. 재료와 도구',25,1),(52,'03. [연습수업] 캘리그래피와 붓펜',25,2),(53,'04. 가는 붓펜으로 글씨 쓰기',25,3),(54,'05. 굵은 붓펜으로 글씨 쓰기',25,4),(55,'06. 굵은 글씨와 가는 글씨 섞어쓰기',25,5),(56,'07. 나만의 캘리작품 만들기',25,6),(57,'08. [보너스 수업] 수채화느낌의 글씨 쓰기',25,7),(64,'STEP1. 재료확인을 하고 시작해봅시다',28,0),(65,'STEP2. 바닥짜기 기법',28,1),(66,'STEP3. 무늬넣기 기법',28,2),(67,'STEP4. 마무르기 기법',28,3),(77,'01. 돌퐁의 가죽공예 프롤로그',29,0),(78,'02. 재료와 도구',29,1),(79,'03. [연습수업] 책갈피 만들기',29,2),(80,'04. 카드지갑 만들기',29,3),(81,'05. [보너스 수업] 즐거운 쉬는 시간',29,4),(82,'06. 필통 만들기',29,5),(83,'07. 명함 지갑 만들기',29,6),(84,'08. 가죽 공예를 취미로 하는 응용 시간',29,7),(85,'09. 수고하셨습니다.',29,8),(88,'1. 오징어 손질법',30,0),(89,'2. 맛있는 오징어 뭇국',30,1),(90,'1. 기본적인 신체 움직임 제어',31,0),(91,'2. 올바른 호흡법',31,1),(92,'3. 나의 소리에 집중하기',31,2),(93,'1. 수업 전 상담',32,0),(94,'2. snpe: 유착된 근육 근막 이완',32,1),(95,'3. PT: 관절 가동성 증진 & 웨이트',32,2),(96,'123',NULL,0),(97,'01. 기본적인 스트로크와 리듬 익히기',34,0),(98,'02. 악보 보는 법',34,1),(99,'03. 리듬 & 필인 연습',34,2),(100,'04. 가요 & 팝송에 드럼 연습',34,3),(104,'메타버스란?',6,0),(105,'zep 공간 체험',6,1),(109,'꽃꽂이의 기본',37,0),(110,'꽃꽂이의 형태',37,1),(111,'플로리스트 실전 연습',37,2),(112,'01. 수업소개',38,0),(113,'02. 작곡하기',38,1),(114,'03. 작사하기',38,2),(115,'04. 노래 녹음하기',38,3),(116,'05. 보정하기',38,4),(117,'스케치와 패턴 만들기',39,0),(118,'패턴을 가죽에 옮기기',39,1),(119,'가죽 재단',39,2),(120,'본딩',39,3),(121,'바느질과 마감',39,4),(122,'데일리 메이크업 1회/3회',40,0),(123,'눈썹 1회/2회',40,1),(124,'1. 비누 제조원리와 제작방법 설명',26,0),(125,'2. 비누의 디자인을 간단하게 스케치',26,1),(126,'3. 비누액을 만들고 디자인에 맞게 조색하여 몰드에 담기',26,2),(127,'4. 비누완성 ( 1 ~ 4주 후 )',26,3),(132,'01. 스케치',42,0),(133,'02. 채색',42,1),(137,'타르트지 만들기',44,0),(138,'커스터드 만들기',44,1),(139,'식힌 뒤 포장하기',44,2),(140,'타르트지 반죽 형태잡기',41,0),(141,'피스타치오 페이스트 만들기',41,1),(142,'크림 만들기',41,2),(143,'모양잡기 및 오븐에 굽기',41,3),(144,'01. 프롤로그',45,0),(145,'02. 재료와 도구',45,1),(146,'03. 연습 수업',45,2),(147,'04. VLLO 영상편집_기초',45,3),(148,'05. 더 멋진 영상 만들기(심화/응용)',45,4),(149,'06. 나만의 영상 완성',45,5),(150,'향료 시향',46,0),(151,'향료에 대한 간략한 설명',46,1),(152,'향료 배합, 주의사항',46,2),(153,'EDP농도 스프레이 만들기',46,3),(154,'나만의 향 조향해보기',46,4),(155,'병입',46,5),(156,'asd',NULL,0),(157,'ㅁㄴㅇㄹ',NULL,1),(158,'ㅁㄴㅇㄹ',NULL,2),(162,'운동 시작 전 목표 설정',49,0),(163,'식단',49,1),(164,'필라테스 기초 다지기',49,2),(165,'운동의 정석',49,3),(166,'유산소 운동',49,4),(167,'스트레칭',49,5),(168,'시작이 반이다 ! 블로그 개설 및 점검',50,0),(169,'블로그 방향성 정하기',50,1),(170,'돈 벌어줄 기본 글쓰기 방법',50,2),(171,'상위 노출할 수 있는 이프리덤의 비법',50,3),(172,'방문 유입을 극대화 시키는 방법',50,4),(173,'반 자동화로 블로그 관리',50,5),(174,'대바늘 기초 배우기',51,0),(175,'니트 샘플 제작하기',51,1),(176,'양말뜨기 기초 탄탄하게 쌓기',51,2),(177,'나만의 양말 디자인하기',51,3),(178,'다양한 드라이플라워 건조법',52,0),(179,'실리카겔 건조하는 방법',52,1),(180,'꽃송이 건조 실습',52,2),(184,'인체 구조 익히기',53,0),(185,'얼굴의 이해',53,1),(186,'몸통의 이해',53,2),(187,'팔의 이해',53,3),(188,'손과 발의 이해',53,4),(189,'인체 드로잉',53,5),(200,'2023년 트렌드를 캐치하는 방법',48,0),(201,'서울대 소비트렌드 분석센터의 예측과 전망',48,1),(202,'2023 Trend Keyword, \'RABBIT JUMP\'',48,2),(203,'음악의 시작',54,0),(204,'Ableton LIVE 다루기',54,1),(205,'리듬과 비트',54,2),(206,'음감과 코드',54,3),(207,'리듬 구성 노하우',54,4),(208,'악기 프리셋 수정하기',54,5),(209,'믹스&마스터링, 레코딩',54,6),(211,'asdg',NULL,0),(213,'te',NULL,0),(223,'asdg',66,0);
/*!40000 ALTER TABLE `curriculum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `ckls_description` text,
  `description` text,
  `kit_description` text,
  `kit_price` bigint DEFAULT NULL,
  `maximum` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `runningtime` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK876yx8w032b70fp9r8uitforb_idx` (`user_id`),
  CONSTRAINT `FK876yx8w032b70fp9r8uitforb` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_lesson_auth_id` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES (3,'드로잉','바늘과 실 그리고 나의 풋사랑','뜨개질을 안뜨개질하게 이쁘게 할 예정이옵고 어쨌든 그렇단다 하하','스릉',10000,5,'김친절 선생님의 안친절한 뜨개질 클래스 같지? 거짓말이다!',10000,3,3),(4,'음악','베이스 기초 이론과 코드, 스케일이론을 바탕으로 레슨합니다.','베이스 기초 이론과 코드, 스케일이론을 바탕으로레슨합니다','악보',10000,2,'베이스기타/콘트라베이스 입시 취미 레슨',10000,5,6),(5,'드로잉','아이패드, 애플펜슬, 프로크리에이트','디지털 드로잉이 처음이신분\n드로잉 취미를 갖고 싶은 분','강의자료',5000,10,'그림으로 만나는 목화 리스',20000,3,7),(6,'기타','','메타버스에서 과연 무엇을 할 수 있을까?\n\n회의? 스터디? 친목 모임? 물론 할 수 있습니다.\n\n하지만 이게 끝이 아니에요. \n\n메타버스 공간에서 내가 기억하고 싶은 온라인 정보를 저장하고 좀 더 시각화된 형태로 즐길 수 있어요.\n\n또, 가족, 친구들과 가족 서재 만들기, 공동 도서관 만들기의 활동을 함께 진행하면서, 공동체의 가치를 다시 되새겨보고 앞으로의 삶의 방향을 정해볼 수도 있습니다.\n\n메타버스 미니 도서관 만들기, 지금 시작해보세요.^^','',0,4,'메타버스 미니 도서관 만들기',5000,2,6),(25,'드로잉','· 캘리그라피의 개념과 붓펜 알아보기\n· 가는 붓펜 - 선긋기/자음/모음/단어/짧은 문장 연습하기\n· 가는 붓펜 - 나만의 문장 다양하게 써보기\n· 작품 - 캘리 책갈피 만들기\n· 굵은 붓펜 - 자음/모음/단어 연습하기','평범했던 문장도 마음을 담은 나만의 글씨로 어여쁘게 다시 태어나게 하는 것.\n그것이 캘리그라피가 가진 가장 큰 매력이 아닐까 생각합니다.?\n\n붓펜의 종류와 붓펜을 다루는 방법, 기초 선긋기부터 나만의 글씨로 예쁜 작품 만들기까지!\n재미있고 쉽게 붓펜 캘리그라피에 대해 알려드리려 해요.\n\n기초부터 특급 비밀 꿀팁까지 하나하나 소개해드릴게요.\n저와 함께 글씨 쓰실래요??','· 붓펜 2종\n· 프리즈마 유성 색연필 24색\n· 고체 물감 12색과 워터브러쉬펜 1개\n▶ 사쿠라코이12색(워터브러쉬 붓펜 포함)으로 변경되었습니다.\n· 피그먼트 라이너펜 0.1mm\n',100000,6,'마음을 담아 쓰는 붓펜 캘리그래피',120000,6,32),(26,'공예','','이런 분들에게 추천드려요!\n-천연비누를 사용하고 있지만, 어떤 방식으로 만들어 지는지 궁금하신 분\n\n-제로웨이스트에 관심이 많으신 분\n\n-가족이 쓰는 비누를 직접 만들고 싶은 분\n\n- 예쁜 비누를 만들어 의미있는 선물을 하고 싶은 분\n\n','',0,5,'그림같은 천연비누 클래스',30000,5,32),(28,'공예','환심','안녕하세요 소소라탄 입니다 :)\n\n라탄으로 소소한일상에 따듯함과 힐링을 선물해 드리고싶어요 \n\n그래서 준비한 이번 수업은 라탄화병 만들기 입니다','라탄재료',10000,6,'내가 만드는 예쁜 미니라탄화병',50000,2,33),(29,'공예','준비물은 별도 구매입니다.','? 클래스 구성 및 소요 시간 ?\n\n총 5가지의 작품들을 함께 만들어 보면서\n자연스레 \'초-중급’ 기술을 익히고,\n이후에도 가죽 공예를 꾸준히 이어나갈 수 있는\n심화 응용 기술까지\n총 15가지 이상의 기법들을 배울 수 있습니다.\n\n• 키링 만들기\n• 카드지갑 만들기\n• 가죽 파우치(필통) 만들기\n• 명함 지갑 만들기\n• 테슬 만들기','?준비물 풀패키지 - 120,000원\n\n온라인 금손 클래스를 준비하면서 어떤 재료들을 구성해야 할 지 정말 많은 고민을 했습니다. 저희의 기술과 노하우를 전해드리는 만큼, 여러분들이 한 번 구매하면 오랫동안 사용할 수 있는 핵심 재료들로 최대한 선별해보았습니다.\n\n수업이 완료되더라도, 곧 오픈될 추가 상품으로 가죽을 구매하실 수 있게 준비 중이니 마음껏 믿고 사용하셔도 된다고 자부합니다 :)\n\n\n✔️가죽 : 모든 가죽은 재단이 되어있습니다.\n책갈피 가죽 / 카드지갑 가죽 세트 / 필통 가죽 세트 / 명함지갑 가죽 세트\n\n✔️재료\n실 / 본드: 불법 소분하지 않은, KC 인증 정품 / 목공용 본드(실 마감용) / 바인더 / 액체 소분용 용기/ 면봉 / 사포 스틱 / 커팅 매트 / 타공판 / 책갈피용 끈\n\n✔️도구\n바늘 / 망치 / 마킹용 송곳 / 그리프 4종 / 우드 슬리커: 가죽을 문질러 광택을 내는 도구 / 본드 스쿱 / 크리저 / 원형 펀치 / 쪽가위 / 쇠 자\n\n✔️부자재\n명함지갑에 사용할 금속 부자재',120000,4,'한땀 한땀 섬세하게 만들어가는 가죽소품 클래스',120000,6,21),(30,'요리','[ 재료 ]\n정수물 2L\n오징어 1마리(약300~350g)\n무 약1/10개(180g)\n대파 약1/2대(60g)\n국간장 약1큰술(11g)\n꽃소금 약1큰술(10g)\n간마늘 1/2큰술(10g)\n멸치액젓 1큰술(8g)\n들기름 1큰술(7g)\n간생강 약1/4큰술(3g)','여러분~ 오징어 좋아하세요?\n오징어처럼 많이 먹는 해산물도 없을 거예요~ 그쵸?\n물회나, 덮밥, 무침으로 먹어도 좋고\n볶음이라도 하는 날엔 세상을 다 얻은 거 같잖아요!\n\n그런데 오늘은 조금 다르게 먹는 방법 알려드릴게요!\n바로 오징어국! 쪼금 특별한 비법이 들어가요~(웃음 이모티콘)\n그리고 밥 많이 먹게 될 테니까 넉넉하게 해두세요!\n안 믿기신다구요? 이건 먹어보셔야 알아요~','오징어 1마리, 무, 대파, 국간장 등 요리 재료 및 조리 도구',20000,6,'장담하건대 내일 또 먹고 싶을 거예요',20000,2,34),(31,'운동','','안녕하세요^^ \n\n루트요가의 “리스토러티브 (회복) 요가”를 소개합니다. \n\n몸 전체의 연결을 인진하고 긴장을 이완해 \n\n본래의 상태로 회복하는 요가입니다.','',0,6,'내 몸과 마음을 돌보는 회복요가',50000,1,35),(32,'운동','건강한 신체','우리에게 필요한건 소통이 아닙니다.','',0,1,'소통보다 근육통',50000,1,36),(34,'음악','개인 드럼 스틱','음치, 박치 누구나 가능!\n배워본 적이 없어도 환영 !\n평생취미 하나 얻어 가세요 ','',0,1,'맞춤형 드럼 클래스',25000,1,37),(37,'공예','꽃가위, 플로럴 테이프, 플로럴 폼','플로리스트가 되고 싶은 당신을 위해 준비했어요','',0,8,'플로리스트 시작해보기',150000,3,48),(38,'음악','녹음 장비','안녕하세요!\n\n아이유입니다.\n\n모든 수업은 직접 체험하게 됩니다!\n\n직접 노래까지 하셔야 진행 가능합니다!! \n\n보컬 보정까지 완벽하게 해드리니 너무 걱정마세요!\n\n만들어질 노래는 \'피아노\'로 연주되고 길이는 1절 분량(1분 ~ 1분 30초) 입니다.\n\n장르는 발라드 / 팝 중에 선택하실 수 있습니다.','',0,2,'누구나 할 수 있는 작곡 원데이 클래스',80000,6,47),(39,'공예','가죽 공예에는 다양한 도구들과 기름 등이 필요합니다. 도구와 소비품들을 따로 키트로 판매하고 있으니 필요하시다면 구매하셔서 사용하시면 됩니다.','가죽 공예 전문가 가죽킹입니다. 해당 클래스에서는 실제로 사용할 수 있는 자기 만의 가죽 지갑을 만드는 것을 목표로 합니다. ','가죽공예 도구와 가죽이 포함되어 있습니다.',50000,6,'원데이 가죽공예 - 카드지갑/반지갑/장지갑',30000,3,49),(40,'뷰티','각종 메이크업 도구','본인에게 맞는 메이크업 스타일을 찾아보세요\n\n눈썹그리기가 어려울때 ​\n\n특별한 날 변신해보세요','',0,6,'그림같은 눈썹그리기',50000,3,50),(41,'요리','집에 오븐과 기본적인 도구들만 있으면 만들 수 있습니다. 베이킹에 필요한 재료들은 키트로 판매하고 있으니 필요하시면 구입해주세요 ^^','이 클래스에선 피스타치오 타르트를 만들 예정입니다. 정말 쉬우니까 한번 도전해봐요!','피스타치오 타르트 만드는 데 필요한 재료들입니다. 필요하시면 구입해주세요.',20000,6,'베이커리 클래스 - 피스타치오타르트',20000,2,51),(42,'드로잉','유화 도구, 캔버스','# 유화 원데이클래스\n\n이런 분들이 오시면 좋아요!!!\n\n-이색 데이트가 하고 픈 연인분들~^^\n\n-그림을 그리고 싶은데 \'곰 손\' 인 분들....ㅠㅠ\n\n-친구와 놀러갈 때~~*^.^*\n\n-그림 완전 처음이신 초보자 분들','스케치된 캔버스, 필요 도구',30000,6,'그림, 참 쉽죠?',50000,3,52),(44,'요리','집에 오븐과 기본적인 조리도구만 있다면 만들 수 있습니다. 재료는 키트로 팔고 있지만, 마트에서 찾기 쉬워요!','이번 클래스에선 에그타르트를 만들어 볼 예정입니다. 정말 쉬우니 한번 도전해보세요!','에그타르트를 만드는 데 필요한 기본적인 재료들이 포함되어 있습니다.',20000,8,'베이커리 클래스 - 에그타르트 만들기',20000,2,51),(45,'기타','스마트폰, 태블릿, 편집 도구( VLLO, vita .. )','? 클래스 구성 ?\n\n• 테마별 실전 촬영 기법\n• 컷 편집, BGM, 효과음, 자막 삽입\n• 색감 보정, 트랜지션, 템플릿 효과 적용\n• 인/아웃트로 제작','? 베이직 패키지: 5,000원\n\n• 영상 기획안 샘플 pdf\n• 벤치마킹 유튜버 모음\n• 저작권 없는 상업용 무료 폰트 20종 모음\n• 저작권 없는 무료 효과음 50종 모음\n• 색감 보정 샘플)\n\n?구매 후, 작가 메시지로 구매자명과 이메일 주소를 알려주세요.\n이메일 주소로 파일을 보내드립니다.\nex) 구매자 000입니다. abc@abc.com\n▶️ 노션(Notion) 링크로 전달 됩니다',5000,4,'스마트폰으로 브이로그 만들기',50000,6,53),(46,'뷰티','관련 조향 키트를 무료로 강의에 포함시켜두었습니다. 키트 구매를 진행해주시길 바랍니다.','화학공학과, 관련 경력 6년 출신의 전문 조향사가 가르쳐주는 향수 클래스 - 당신 만의 특별한 향수를 만들어보세요','',0,6,'전문 조향사가 가르쳐주는 조향 클래스 - 향수 만들기',90000,3,54),(48,'기타','','서울대 소비 트렌드 분석 센터가 바라보는 2023년의 주요 10대 트렌드를 2시간 분량의 클래스로 압축하여 담았습니다. 이 클래스 하나만으로도 지난 한 해를 되돌아보고, 누구보다 빠르게 2023년을 맞이하는 전략을 세울 수 있습니다.\n\n그 어느 때보다 부정적인 전망이 예측되는 2023년, 하지만 트렌드를 미리 알고 위기에 맞선다면 여러분의 한 해는 아주 극적으로 달라질 것입니다. 새해에는 모든 분들이 토끼처럼 Jump Up 할 수 있도록. 더 높은 도약을 준비하기 위한 <트렌드 코리아 2023>, 지금 클래씨에서 만나보세요.','',0,8,'김난도 교수에게 직접 듣는 <트렌드 코리아 2023>',80000,2,55),(49,'운동','','스쿼트, 런지, 데드리프트, 브릿지, 플랭크, 푸쉬업, 힙업, 복근 운동까지! 운동과 홈트레이닝에 관심이 있는 분들이라면 한 번쯤은 들어보고 시도해 봤을 동작들이죠! 하지만 운동 효과를 볼 수 있는 올바른 자세, 제대로 알고 계신가요? 제 클래스에서는 필라테스 기초를 기반으로 각 운동 동작을 세세하게 뜯어보며 호흡은 어떻게 해야 하며, 근육은 어떻게 써야 하는지를 하나하나 꼼꼼히 알려드릴게요. 그다음 각 동작을 저도 함께 반복하며 함께 운동하는 내내 지루하지 않게 기초 체력을 다져보아요.','',0,6,'국내1위 운동 유튜버 홈트계의 끝판왕 \'힙으뜸\'',70000,2,56),(50,'기타','','돈 벌고 싶으신 분들, 반갑습니다.\n잘 오셨습니다.','',0,8,'네이버 블로그 특강',90000,4,57),(51,'공예','실, 대바늘','나만의 패턴과 색상의 양말,\n대바늘로 차근차근 완성해요.','양말 도안, 대바늘, 실',40000,4,'지친 하루를 다정하게 감싸줄 사계절 니트 양말 뜨기',70000,8,58),(52,'공예','실리카겔, 생화','드라이플라워를 사용해\n총 5개의 작품 만들기','강의 자료, 실리카겔, 생화',20000,6,'직접 만드는 드라이플라워',30000,2,59),(53,'드로잉','연필, 종이','저는 우리가 늘 마주하고 함께하는 사람에 관심이 많아요. 그리고 그들의 마음에도 관심이 많아요. 사람을 그린다는 것은 어쩌면 나의 마음을 그리고 그들의 마음을 그리는 것이 아닐까 생각합니다.','강의 자료, 도안',10000,6,'인체 드로잉, 사람을 이해하고 마음을 그리다',50000,2,60),(54,'음악','Ableton live','프로듀싱을 할 때 쉬운 길을 안 가려고 해요. 재미없으니까.\n내가 똑같은 것을 한다는 게 되게 자존심이 상해요.\n쉬운 길이 아니라 어려운 길을 돌아서 가더라도, 새로운 음악을 만들고 싶어요.','',0,2,'그루비룸의 Groovy 뮤직',120000,8,61),(66,'음악','asdg','asdg','asdgasdg',3000,1,'asdg',2000,1,3);
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `photocard_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi2wo4dyk4rok7v4kak8sgkwx0_idx` (`user_id`),
  KEY `FKoori8hl6jc64cumypih9s5jnr` (`photocard_id`),
  CONSTRAINT `FKi2wo4dyk4rok7v4kak8sgkwx0` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKoori8hl6jc64cumypih9s5jnr` FOREIGN KEY (`photocard_id`) REFERENCES `photocard` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (45,38,6),(62,38,16),(71,37,16),(83,39,16),(89,41,16),(96,41,36),(98,38,36),(99,37,36),(101,20,36),(102,18,36),(103,26,36),(104,39,36),(106,18,37),(107,20,37),(108,18,6),(109,39,42),(110,41,42),(111,20,42),(112,38,42),(113,37,42),(114,43,42),(129,39,6),(132,41,6),(139,20,6),(154,44,42),(164,26,1),(171,20,1),(207,41,1),(216,37,1),(218,37,51),(219,43,51),(220,37,54),(221,43,54),(223,39,54),(224,41,54),(225,18,1),(226,44,54),(228,38,54),(229,26,54),(230,20,54),(231,18,54),(237,43,6);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `regtime` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcvf4mh5se36inrxn7xlh2brfv_idx` (`user_id`),
  CONSTRAINT `FK_notice_auth_id` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`),
  CONSTRAINT `FKcvf4mh5se36inrxn7xlh2brfv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (5,'테스트 공지사항3','','2023-02-13T06:32:50.733','테스트 공지사항4',20),(6,'ㅁㅁ','','2023-02-13T06:32:45.492','ㅅㅅ',20),(7,'희희','','2023-02-15T11:44:39.374','공지사항 수정',20);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  `send_user_id` bigint DEFAULT NULL,
  `target_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKefco4aywx7vf73s30u91ecukv` (`lesson_id`),
  KEY `FKnl29c0m994gj1icx3wdno9b4q` (`send_user_id`),
  KEY `FKopmlfyllvr1wncw4u4mi2kln9` (`target_user_id`),
  CONSTRAINT `FKefco4aywx7vf73s30u91ecukv` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKnl29c0m994gj1icx3wdno9b4q` FOREIGN KEY (`send_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKopmlfyllvr1wncw4u4mi2kln9` FOREIGN KEY (`target_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_lesson`
--

DROP TABLE IF EXISTS `open_lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `open_lesson` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `end_time` datetime(6) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc1oi8hn7otf66dutvlqqfdu4s` (`lesson_id`),
  CONSTRAINT `FKc1oi8hn7otf66dutvlqqfdu4s` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_lesson`
--

LOCK TABLES `open_lesson` WRITE;
/*!40000 ALTER TABLE `open_lesson` DISABLE KEYS */;
INSERT INTO `open_lesson` VALUES (5,'2023-01-09 05:00:00.000000',4,'2023-01-09 01:00:00.000000'),(6,'2023-01-16 05:00:00.000000',4,'2023-01-16 01:00:00.000000'),(7,'2023-01-23 05:00:00.000000',4,'2023-01-23 01:00:00.000000'),(8,'2023-01-30 05:00:00.000000',4,'2023-01-30 01:00:00.000000'),(9,'2023-03-30 05:00:00.000000',4,'2023-03-30 01:00:00.000000'),(10,'2023-03-09 23:00:00.000000',5,'2023-03-09 18:00:00.000000'),(11,'2023-03-02 23:00:00.000000',5,'2023-03-02 18:00:00.000000'),(57,'2023-02-16 10:06:00.000000',3,'2023-02-16 07:06:00.000000'),(58,'2023-02-14 15:06:00.000000',3,'2023-02-14 12:06:00.000000'),(59,'2023-02-13 23:38:00.000000',3,'2023-02-13 20:38:00.000000'),(62,'2023-02-22 20:50:00.000000',3,'2023-02-22 17:50:00.000000'),(75,'2023-03-02 12:24:00.000000',3,'2023-03-02 09:24:00.000000'),(76,'2023-02-27 12:24:00.000000',3,'2023-02-27 09:24:00.000000'),(77,'2023-02-25 12:24:00.000000',3,'2023-02-25 09:24:00.000000'),(79,'2023-02-28 12:24:00.000000',3,'2023-02-28 09:24:00.000000'),(83,'2023-02-24 00:56:00.000000',4,'2023-02-23 19:56:00.000000'),(85,'2023-02-17 21:00:00.000000',28,'2023-02-17 19:00:00.000000'),(86,'2023-02-24 21:00:00.000000',28,'2023-02-24 19:00:00.000000'),(88,'2023-02-16 00:57:00.000000',3,'2023-02-15 21:57:00.000000'),(91,'2023-02-17 20:00:00.000000',34,'2023-02-17 19:00:00.000000'),(95,'2023-02-16 22:07:00.000000',3,'2023-02-16 19:07:00.000000'),(100,'2023-02-17 01:08:00.000000',3,'2023-02-16 22:08:00.000000'),(107,'2023-02-18 02:30:00.000000',39,'2023-02-17 23:30:00.000000'),(110,'2023-02-17 20:10:00.000000',32,'2023-02-17 19:10:00.000000'),(111,'2023-02-18 07:30:00.000000',39,'2023-02-18 04:30:00.000000'),(112,'2023-02-23 20:00:00.000000',32,'2023-02-23 19:00:00.000000'),(113,'2023-02-17 20:00:00.000000',32,'2023-02-17 19:00:00.000000'),(114,'2023-02-17 23:00:00.000000',50,'2023-02-17 19:00:00.000000'),(115,'2023-02-20 23:00:00.000000',50,'2023-02-20 19:00:00.000000'),(116,'2023-02-17 20:30:00.000000',44,'2023-02-17 18:30:00.000000'),(117,'2023-02-22 23:00:00.000000',50,'2023-02-22 19:00:00.000000'),(118,'2023-02-18 00:30:00.000000',44,'2023-02-17 22:30:00.000000'),(119,'2023-02-18 03:30:00.000000',41,'2023-02-18 01:30:00.000000'),(120,'2023-02-18 21:00:00.000000',48,'2023-02-18 19:00:00.000000'),(121,'2023-02-21 21:00:00.000000',48,'2023-02-21 19:00:00.000000'),(122,'2023-02-23 21:00:00.000000',48,'2023-02-23 19:00:00.000000'),(123,'2023-02-18 01:00:00.000000',45,'2023-02-17 19:00:00.000000'),(124,'2023-02-17 21:00:00.000000',6,'2023-02-17 19:00:00.000000'),(125,'2023-02-19 21:00:00.000000',6,'2023-02-19 19:00:00.000000'),(126,'2023-02-17 22:39:00.000000',46,'2023-02-17 19:39:00.000000'),(127,'2023-02-17 22:40:00.000000',40,'2023-02-17 19:40:00.000000'),(128,'2023-02-20 21:40:00.000000',40,'2023-02-20 18:40:00.000000'),(129,'2023-02-21 07:00:00.000000',54,'2023-02-20 23:00:00.000000'),(130,'2023-02-22 07:00:00.000000',54,'2023-02-21 23:00:00.000000'),(131,'2023-02-23 07:00:00.000000',54,'2023-02-22 23:00:00.000000'),(132,'2023-02-24 07:00:00.000000',54,'2023-02-23 23:00:00.000000'),(133,'2023-02-25 07:00:00.000000',54,'2023-02-24 23:00:00.000000'),(134,'2023-02-18 01:00:00.000000',49,'2023-02-17 23:00:00.000000'),(135,'2023-02-18 00:00:00.000000',31,'2023-02-17 23:00:00.000000'),(136,'2023-02-18 01:00:00.000000',30,'2023-02-17 23:00:00.000000'),(137,'2023-02-19 01:00:00.000000',30,'2023-02-18 23:00:00.000000'),(138,'2023-02-20 01:00:00.000000',30,'2023-02-19 23:00:00.000000'),(139,'2023-02-18 05:00:00.000000',38,'2023-02-17 23:00:00.000000'),(140,'2023-02-22 05:00:00.000000',38,'2023-02-21 23:00:00.000000'),(141,'2023-02-22 01:00:00.000000',53,'2023-02-21 23:00:00.000000'),(142,'2023-02-18 01:00:00.000000',53,'2023-02-17 23:00:00.000000'),(143,'2023-02-18 02:00:00.000000',42,'2023-02-17 23:00:00.000000'),(144,'2023-02-19 02:00:00.000000',42,'2023-02-18 23:00:00.000000'),(145,'2023-02-21 02:00:00.000000',42,'2023-02-20 23:00:00.000000'),(146,'2023-02-18 05:00:00.000000',25,'2023-02-17 23:00:00.000000'),(147,'2023-02-19 05:00:00.000000',25,'2023-02-18 23:00:00.000000'),(148,'2023-02-25 05:00:00.000000',25,'2023-02-24 23:00:00.000000'),(149,'2023-02-26 05:00:00.000000',25,'2023-02-25 23:00:00.000000'),(150,'2023-02-21 04:00:00.000000',26,'2023-02-20 23:00:00.000000'),(151,'2023-02-22 04:00:00.000000',26,'2023-02-21 23:00:00.000000'),(152,'2023-02-18 02:00:00.000000',37,'2023-02-17 23:00:00.000000'),(153,'2023-02-21 02:00:00.000000',37,'2023-02-20 23:00:00.000000'),(154,'2023-02-23 02:00:00.000000',37,'2023-02-22 23:00:00.000000'),(155,'2023-02-25 02:00:00.000000',37,'2023-02-24 23:00:00.000000'),(156,'2023-02-18 07:00:00.000000',51,'2023-02-17 23:00:00.000000'),(157,'2023-02-21 07:00:00.000000',51,'2023-02-20 23:00:00.000000'),(158,'2023-02-28 07:00:00.000000',51,'2023-02-27 23:00:00.000000'),(159,'2023-02-18 01:00:00.000000',52,'2023-02-17 23:00:00.000000'),(160,'2023-02-21 01:00:00.000000',52,'2023-02-20 23:00:00.000000'),(161,'2023-02-23 01:00:00.000000',52,'2023-02-22 23:00:00.000000');
/*!40000 ALTER TABLE `open_lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `open_lesson_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6u13sm6etwnevp316mg7u7xlf` (`open_lesson_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7_idx` (`user_id`),
  CONSTRAINT `FK6u13sm6etwnevp316mg7u7xlf` FOREIGN KEY (`open_lesson_id`) REFERENCES `open_lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'서울특별시 강서구','april2nd@april.com','01012312322',2000,'2023-02-09 16:06:44.000000',7,7),(3,'멀티캠퍼스 역삼','rlawnsgh8395@naver.com','01012312322',2000,'2023-02-09 16:07:04.030000',10,6),(26,'멀티캠퍼스 역삼','rlawnsgh8395@naver.com','01012341234',20000,'2023-02-14 19:30:28.592000',59,6),(33,'멀티캠퍼스 역삼','rlawnsgh8395@naver.com','01012341234',60000,'2023-02-15 09:35:49.564000',85,6),(34,'서울 노원구 화랑로51길 78','ddd@ddd.com','01076143400',10000,'2023-02-15 12:53:15.829000',57,38),(37,'하하하','dolpong_@naver.com','01076143400',25000,'2023-02-15 17:12:20.579000',91,40),(42,'css','naver@naver.com','01000000010',10000,'2023-02-16 14:35:43.027000',57,9),(43,'vv','test5@ssafy.com','01077777777',10000,'2023-02-16 14:35:59.354000',57,16),(45,'vv','test5@ssafy.com','01077777777',10000,'2023-02-16 14:43:56.088000',95,16),(46,'vv','test5@ssafy.com','01077777777',10000,'2023-02-16 14:44:09.674000',100,16),(47,'css','naver@naver.com','01000000010',50000,'2023-02-16 14:52:42.757000',85,9),(48,'css','naver@naver.com','01000000010',150000,'2023-02-16 15:00:06.013000',152,9),(49,'css','naver@naver.com','01000000010',30000,'2023-02-16 15:02:49.060000',159,9),(50,'서울특별시 마포구','gym@test.com','01012341234',50000,'2023-02-16 15:05:44.266000',159,36),(51,'ㄴㅇㄹㄴㅁㄹ','google@google.com','01010101010',30000,'2023-02-16 15:06:15.597000',107,26),(57,'iu','iu@iu.com','10101010101',120000,'2023-02-16 15:28:29.183000',129,47),(58,'vv','test5@ssafy.com','01077777777',30000,'2023-02-16 15:56:31.869000',107,16),(60,'서울특별시 강서구','rlawnsgh8395@naver.com','01012341234',120000,'2023-02-16 16:04:12.401000',129,6);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pamphlet`
--

DROP TABLE IF EXISTS `pamphlet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pamphlet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3umi80h8y787f8pj7c9j8e9l4` (`lesson_id`),
  CONSTRAINT `FK3umi80h8y787f8pj7c9j8e9l4` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pamphlet`
--

LOCK TABLES `pamphlet` WRITE;
/*!40000 ALTER TABLE `pamphlet` DISABLE KEYS */;
INSERT INTO `pamphlet` VALUES (11,'lesson5_pamphlet1.jpg',5),(16,'gaga.jpg',NULL),(25,'cat5.jpg',NULL),(26,'crocheting-1479213__340.jpg',3),(27,'crocheting-1479210__340.jpg',3),(28,'crocheting-1479217_960_720.jpg',3),(29,'lala.jpg',3),(30,'pumpkins-1009197__340.jpg',3),(43,'lesson1_checklist1.jfif',4),(44,'lesson1_profile.jfif',4),(45,'4a13719dfe7940618c02ec846cd16c08_1080.jpg',25),(46,'a6426539104041a9847fb32682d4b21f_1080.jpg',25),(50,'dsBEx30RtOuQrQtq_63305d869bd25d23f4f888f3.jpg',28),(51,'nKRre7Npxy189uBJ_63305d869bd25d23f4f888f3.jpg',28),(55,'3113856f797049df8abd0e7c099514c9_1080.jpg',29),(57,'%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202023-02-15%20103326.png',30),(58,'class_profile.png',30),(59,'yoga.jfif',31),(60,'profile.jfif',32),(61,'profile2.jfif',32),(62,'cat-5183427__480.jpg',NULL),(63,'다운로드.jpg',NULL),(64,'profile.jpg',34),(65,'pia_profile.jpg',34),(68,'profile.jfif',6),(69,'profile2.png',6),(71,'flower123.jpg',37),(72,'lesson_profile.jfif',38),(73,'lesson_profile2.jpg',38),(74,'leatherinfo.jpg',39),(75,'leatherer.jpg',39),(76,'profile2.jpg',40),(77,'lessonprofile.jfif',40),(78,'a391a393492a4417b680c5aeb9c3b72b_1440.jpg',26),(79,'af42491d3f5a452fb8946b2b81bc9b14_1440.jpg',26),(81,'lesson_profile.jfif',42),(82,'lesson_profile2.gif',42),(88,'eggtart.jpg',44),(89,'tart.jpg',41),(90,'lesson_profile.png',45),(91,'lesson_profile2.png',45),(92,'lesson_profile3.png',45),(93,'prefuem.jpg',46),(94,'cat-5183427__480.jpg',NULL),(95,'cat-5183427__480.jpg',NULL),(96,'cat-5183427__480.jpg',NULL),(101,'lesson_profile.webp',49),(102,'profile2.webp',49),(103,'profile1.webp',50),(104,'profile2.webp',50),(105,'profile.webp',51),(106,'profile2.webp',51),(107,'profile3.webp',51),(108,'profile4.webp',51),(109,'profile.webp',52),(110,'profile2.webp',52),(111,'profile3.webp',52),(112,'profile4.webp',52),(118,'profile.webp',53),(119,'profile2.webp',53),(120,'profile3.webp',53),(128,'lesson_profile.webp',48),(129,'lesson_profile2.webp',48),(130,'lesson_profile3.webp',48),(131,'profile.webp',54),(132,'profile2.webp',54),(133,'profile3.webp',54),(134,'profile4.webp',54),(136,'Group 198 (1).png',NULL),(138,'teacher_profile.webp',NULL),(144,'Group 198 (1).png',66);
/*!40000 ALTER TABLE `pamphlet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photocard`
--

DROP TABLE IF EXISTS `photocard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photocard` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `lesson_name` varchar(255) DEFAULT NULL,
  `regdate` varchar(255) DEFAULT NULL,
  `sign` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `open_lesson_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKenno1lotduu20jvbmot7nrgfq_idx` (`user_id`),
  CONSTRAINT `FKenno1lotduu20jvbmot7nrgfq` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photocard`
--

LOCK TABLES `photocard` WRITE;
/*!40000 ALTER TABLE `photocard` DISABLE KEYS */;
INSERT INTO `photocard` VALUES (18,'ㅎㅎㅎ','photo-cards/test@test.com/2/test/뜨개질.jpg','앙금플라워 클래스 소모임','2023-02-14T00:39:26.596','','ㅎㅎ',21,NULL),(20,'fewfwe','photo-cards/test@test.com/2/test/뜨개질 실.jpg','앙금플라워 클래스 소모임','2023-02-14T01:26:14.505','','fefwef',21,NULL),(26,'bdhdhd','photo-cards/test@test.com/2/test/image.jpg','앙금플라워 클래스 소모임','2023-02-14T01:33:54.744','','hdhdhdh',21,NULL),(37,'ㅇㅇ','photo-cards/12@12.com/11/63/1674921314104.jpg','4343','2023-02-14T04:59:11.501','','ㅇㅇㅇ',1,63),(38,'맛있다','photo-cards/test2@ssafy.com/14/82/1675074701105-5.jpg','test0213','2023-02-14T08:00:05.062','','소중한시간',13,82),(39,'키키','photo-cards/test@test.com/1/66/image.jpg','1313','2023-02-14T08:24:34.707','','첫 시연 테스트',21,66),(41,'희희','photo-cards/rlawnsgh8395@naver.com/5/10/1B4ED4FA-124C-46A5-B299-E6DEB982E198.jpeg','그림으로 만나는 목화 리스','2023-02-14T11:16:46.958','','지나간 일에 미련갖지 마세요',6,10),(43,'좋았어요','photo-cards/test5@ssafy.com/27/84/20220904_151300.jpg','축구','2023-02-15T06:11:23.878','','즐거운 시간',16,84),(44,'하하','photo-cards/dolpong_@naver.com/34/91/image.jpg','맞춤형 드럼 클래스','2023-02-15T08:13:21.545','','불태웠다..!',40,91);
/*!40000 ALTER TABLE `photocard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `regtime` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK22kn9bnirhpqdv8ibyyo28nkr_idx` (`user_id`),
  CONSTRAINT `FK22kn9bnirhpqdv8ibyyo28nkr` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna_answer`
--

DROP TABLE IF EXISTS `qna_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_answer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `qna_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2lyed41sgyv5evyxwjjfybgk1` (`qna_id`),
  CONSTRAINT `FK2lyed41sgyv5evyxwjjfybgk1` FOREIGN KEY (`qna_id`) REFERENCES `qna` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_answer`
--

LOCK TABLES `qna_answer` WRITE;
/*!40000 ALTER TABLE `qna_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `regtime` datetime(6) DEFAULT NULL,
  `score` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `lesson_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKap6dvmf94mv603qyjyydvbwba` (`lesson_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi_idx` (`user_id`),
  CONSTRAINT `FKap6dvmf94mv603qyjyydvbwba` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (174,'재밌어요','reviews/3/174/서명.jpg','2023-02-15 09:21:32.477000',4,NULL,3,16),(177,'비누 좋아','reviews/26/177/67442713.jpg','2023-02-15 09:23:34.962000',3,NULL,26,16),(186,'아주 잘가르쳐주십니다. 좋아요.','','2023-02-16 14:56:08.400000',4,NULL,28,9),(187,'플로리스트가 꿈이었는데 이 클래스로 꿈을 시작해보겠습니다!','','2023-02-16 15:01:20.003000',5,NULL,37,9),(188,'너무 이뻐요~ 잘 만들어서 소중히 간직하겠습니다','','2023-02-16 15:04:08.802000',4,NULL,52,9),(189,'짱 좋습니다. 너무 좋아요~','','2023-02-16 15:07:16.764000',5,NULL,39,26),(197,'시야가 넓어지는 시간이었습니다 !!','reviews/54/197/iu_review.jfif','2023-02-16 15:31:22.543000',5,NULL,54,47),(198,'새로운 취미가 생겼어요 ! 너무 만족합니다','reviews/52/198/review.jfif','2023-02-16 15:31:56.098000',4,NULL,52,36),(199,'실물이 훨씬 잘생기셨어요 !!','reviews/54/199/music_review.jfif','2023-02-16 16:05:37.395000',5,NULL,54,6);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `description` text,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `point` bigint DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `auth_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf4clu79dguyp43303rh73w6vw` (`auth_id`),
  CONSTRAINT `FKf4clu79dguyp43303rh73w6vw` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'12','2023-01-01','2023-02-09T00:21:40.097',NULL,'profiles/12@12.com/다운로드.jpg','12','123','01012121212',3107258,'ROLE_USER',1),(3,'서울특별시 역삼의 어느 한 건물','2023-01-09','2023-02-09T00:27:29.321','glglgl','profiles/ttest@gmail.com/woman-6477257__340.jpg','김친절','김친절','01082828282',399000,'ROLE_USER',3),(4,'58-5, Myeongdal-ro 22-gil','2023-01-01','2023-02-09T00:28:45.479',NULL,NULL,'김진호','김진호','+821037318413',100000,'ROLE_USER',4),(5,'멀티캠퍼스 역삼','2023-01-06','2023-02-09T01:58:41.207',NULL,NULL,'클래씨','관리자','01012341234',200000,'ROLE_ADMIN',5),(6,'서울특별시 강서구','1997-04-02','2023-02-09T02:01:58.217','안녕','profiles/rlawnsgh8395@naver.com/panda_profile.png','김준호','april2nd','01012341234',4000,'ROLE_USER',6),(7,'서울특별시 강서구','1997-04-02','2023-02-09T03:26:46.606',NULL,NULL,'김준호','사월','01012341234',269998,'ROLE_USER',7),(9,'css','2023-01-01','2023-02-10T07:15:16.376','안녕하세요','profiles/naver@naver.com/img.png','css','NAVMER','01000000010',54957,'ROLE_USER',9),(10,'12','2023-01-01','2023-02-10T08:25:23.064',NULL,NULL,'12','12','01012121212',200000,'ROLE_USER',10),(11,'서울','2005-12-21','2023-02-11T12:45:25.869',NULL,NULL,'test','ㅎㅇㅎㅇ','01000000000',200000,'ROLE_USER',11),(12,'sdfsdf','2005-12-21','2023-02-11T13:39:41.082',NULL,NULL,'test1','ㅁㅁ','01088888888',200000,'ROLE_USER',12),(13,'aaa','2003-12-19','2023-02-11T14:21:49.419',NULL,'profiles/test2@ssafy.com/고병진.jpg','test2','test2','01011111111',7000,'ROLE_USER',13),(14,'sda','2023-01-01','2023-02-11T15:06:56.130',NULL,NULL,'test3','test3','0109999999',79000,'ROLE_USER',14),(15,'zzz','2023-01-01','2023-02-11T17:34:04.531',NULL,NULL,'test4','test4','01022222222',199000,'ROLE_USER',15),(16,'vv','2005-12-19','2023-02-11T17:46:58.016',NULL,'profiles/test5@ssafy.com/토끼4.png','test5','test','01077777777',172957,'ROLE_USER',16),(17,'서울특별시 역삼의 어느 한 건물','2023-01-02','2023-02-12T13:05:09.770','gkgkgk','profiles/test1234@gmail.com/istockphoto-1425395882-170667a.jpg','테스트1234','test1234','01082828282',69957,'ROLE_USER',17),(20,'관리자','2022-01-01','2023-02-13T01:32:06.015',NULL,NULL,'관리자','관리자','01012121212',90000,'ROLE_ADMIN',20),(21,'서울 노원구 화랑로51길 78','1997-04-11','2023-02-14T00:28:00.982',NULL,'profiles/test@test.com/다운로드.jfif','수련','돌퐁','01076143400',29957,'ROLE_USER',21),(22,'ddxddx','2011-08-09','2023-02-14T00:33:10.946',NULL,NULL,'test','test','01076143400',95000,'ROLE_USER',22),(26,'ㄴㅇㄹㄴㅁㄹ','2023-01-01','2023-02-14T07:20:28.689','구글구글','profiles/google@google.com/goo.png','son','Google','01010101010',48957,'ROLE_USER',26),(31,'서울특별시 강서구','1997-04-02','2023-02-14T10:49:42.205',NULL,NULL,'김준호','사월','01012341234',200000,'ROLE_USER',31),(32,'서울 강서구 ','1997-04-02','2023-02-14T11:54:44.009',NULL,'profiles/unknownflowers@naver.com/뚝딱이.jfif','김뚝딱','unknownflowers','01012341234',200000,'ROLE_USER',32),(33,'서울특별시 은평구','1980-07-01','2023-02-15T00:11:23.166',NULL,'profiles/ho7unkim@github.com/다운로드 (1).jfif','김호준','짱구','01022331122',210000,'ROLE_USER',33),(34,'서울특별시 강남구','1964-03-01','2023-02-15T01:30:26.813',NULL,'profiles/back@back.com/다운로드2.jfif','백종원','백선생','01012341234',100000,'ROLE_USER',34),(35,'서울특별시 영등포구','2019-04-01','2023-02-15T01:46:45.647',NULL,'profiles/yoga@test.com/yoga_profile.jfif','요가라이프','요가라이프','01022223333',200000,'ROLE_USER',35),(36,'서울특별시 마포구','2014-05-02','2023-02-15T01:53:36.303',NULL,'profiles/gym@test.com/gym_profile.jfif','김종국','짐종국','01012341234',148000,'ROLE_USER',36),(37,'서울특별시 강남구','1992-04-02','2023-02-15T02:26:20.661',NULL,'profiles/drum@test.com/pia_profile.jpg','양혜승','PIA','01022331122',150000,'ROLE_USER',37),(38,'서울 노원구 화랑로51길 78','1997-04-11','2023-02-15T03:49:24.026',NULL,NULL,'수련','test','01076143400',40000,'ROLE_USER',38),(39,NULL,NULL,'2023-02-15T03:58:12.029',NULL,NULL,'고태진','adfsdf',NULL,200000,'ROLE_USER',39),(40,'하하하',NULL,'2023-02-15T06:33:53.105',NULL,NULL,'수련',NULL,'01076143400',124000,'ROLE_USER',40),(41,'없음','1940-04-11','2023-02-15T07:20:28.702',NULL,NULL,'닉네임','닉네임','01076821360',200000,'ROLE_USER',41),(42,'13','2023-01-01','2023-02-15T08:00:41.606',NULL,NULL,'12','13','01039298053',200000,'ROLE_USER',42),(43,'efef','2012-08-17','2023-02-15T12:05:54.177',NULL,NULL,'efef','wef','01023234123',200000,'ROLE_USER',43),(44,NULL,NULL,'2023-02-15T12:06:44.563',NULL,NULL,'장이국',NULL,NULL,200000,'ROLE_USER',44),(46,'서울','2003-01-21','2023-02-15T15:23:14.022',NULL,NULL,'김진호','클래시중독자','01088888888',200000,'ROLE_USER',46),(47,'iu','2023-12-01','2023-02-16T00:44:18.223','신인가수 아이유 입니당','profiles/iu@iu.com/iuuu.jpg','iu','iu','10101010101',80000,'ROLE_USER',47),(48,'서울특별시 강서구 화곡동','2023-01-01','2023-02-16T00:55:50.343','꽃 관련 클래스들을 운영하고 있습니다.','profiles/flower@naver.com/flower.jpg','flower','flower','01011121113',350000,'ROLE_USER',48),(49,'인천광역시 연수구 송도동','1998-11-02','2023-02-16T01:18:32.603','인천에서 가죽공방을 운영하고 있습니다. 언제든지 편하게 문의해주세요.','profiles/leather@leather.com/leather.jpg','김가죽','가죽킹','0105147242',260000,'ROLE_USER',49),(50,'부산광역시 해운대구','2007-07-02','2023-02-16T01:32:32.895',NULL,'profiles/makeup@test.com/teacher_profile.jfif','한눈썹','고유','0101123123',200000,'ROLE_USER',50),(51,'서울특별시 송파구 가락동','1996-11-18','2023-02-16T01:44:30.621','송파구에서 베이커리 킴 운영 중','profiles/tart@tart.com/starw.jpg','김현주','tartoleode','01014587269',200000,'ROLE_USER',51),(52,'미쿡','1947-04-15','2023-02-16T01:44:55.086',NULL,'profiles/bob@test.com/bob_profile.jfif','밥아저씨','밥아저씨','01012341234',200000,'ROLE_USER',52),(53,'서울','1968-02-02','2023-02-16T02:07:23.087',NULL,'profiles/vlog@test.com/teacher_profile.png','브이로거','브이로거','010',200000,'ROLE_USER',53),(54,'서울특별시 동작구 노량진동','1985-11-16','2023-02-16T02:10:47.109','전문 조향사','profiles/perfume@perfume.com/PERFEFE.jpg','최지수','Perfumer','01025687456',200000,'ROLE_USER',54),(55,'서울특별시 강남구','1977-05-01','2023-02-16T03:48:01.124','안녕하세요, <트렌드코리아 2023> 저자 김난도입니다.','profiles/nando@test.com/teacher_profile.webp','김난도','김난도','01022331122',200000,'ROLE_USER',55),(56,'서울특별시 영등포구','1978-02-02','2023-02-16T04:00:51.339','안녕하세요. 유튜브 \'힙으뜸\'채널을 운영 중인 홈트계의 끝판왕, 필라테스 강사 심으뜸입니다. 많은 분들과 운동으로서 소통하고 몸이 건강해지는 것과 동시에 마음까지 함께 건강해지셨으면 하는 마음에 이렇게 온라인 클래스를 준비하게 되었습니다. 저는 정말로 운동을 사랑하는 사람이랍니다. 이런 저의 에너지를 클래스를 통해 나누고 함께 느끼며, 여러분이 오늘보다 내일 더 건강하고 행복해졌으면 좋겠어요.','profiles/sim@test.com/teacher_profile.webp','심으뜸','심으뜸','ㅇㅇㅇㅇ',200000,'ROLE_USER',56),(57,'인천광역시 미추홀구','2018-04-03','2023-02-16T04:04:58.409','안녕하세요 여러분들께 경제적 자유를 선사해 줄 남자 이프리덤 입니다','profiles/freedum@test.com/teature_profile.webp','이프리덤','이프리덤','01012341234',200000,'ROLE_USER',57),(58,'제주특별자치도 제주시','2022-01-01','2023-02-16T04:09:22.373','손으로 만드는 것을 좋아하고 세상을 다채롭게 바라보고 싶은 디자이너 LOOOP 입니다.써피스디자인을 전공하고 패턴, 소재 등을 공부하며 니팅 작업과 클래스를 진행하고 있어요. 어려운 기법이나 복잡한 디자인보다는, 누구나 재미있게 작업할 수 있는 간결하면서 컨셉이 확실한 디자인을 선호합니다.제가 양말을 뜨며 느낀 즐거움과 성취감, 내 작품을 완성하는 행복을 클래스를 통해 여러분과 나눌 수 있길 바라요.','profiles/looop@test.com/teacher_profile.jfif','LOOOP','LOOOP','01012341234',200000,'ROLE_USER',58),(59,'서울특별시 역삼동','2017-06-03','2023-02-16T04:18:05.370','첫 온라인 클래스, \"행복한 순간의 감동까지 담아내다. 셀프드라이플라워 꽃 디자인\" 입니다.','profiles/dryflower@test.com/teacher_profile.jpg','DE:FL','DE:FL','01012341234',280000,'ROLE_USER',59),(60,'서울특별시 중구','2007-03-17','2023-02-16T04:24:08.847','사람을 그린다는 것은 그 사람의 마음을 그리는 것과 같은 것 같다고 생각합니다. 그리고 그 사람의 삶도 담겨 있죠. 저는예술이 삶을 표현하고 삶을 위로하고 삶을 이어가게 하는 원동력의 하나라고 생각해요. 사람의 몸짓에서, 눈빛에서 전해지는 아픔과 슬픔과 행복 속에서 위로받고 위로하며 살고 싶습니다.','profiles/huger@test.com/teacher_profile.png','HUGer','HUGer','01012341234',200000,'ROLE_USER',60),(61,'서울특별시 마포구','2020-05-03','2023-02-16T04:29:58.452','프로듀싱 듀오, 그루비룸입니다.','profiles/GR@test.com/teacher_profile.webp','그루비룸','그루비룸','01012341234',440000,'ROLE_USER',61);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 17:02:43
