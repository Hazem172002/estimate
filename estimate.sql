-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2023 at 12:57 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `estimate`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `subtitle` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `subtitle`) VALUES
('1', 'Cat-1', 'Cat-1'),
('2', 'Cat-2', 'Cat-2'),
('3', 'Cat-3', 'Cat-3');

-- --------------------------------------------------------

--
-- Table structure for table `foundationorders`
--

CREATE TABLE `foundationorders` (
  `id` varchar(191) NOT NULL,
  `foundationId` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foundations`
--

CREATE TABLE `foundations` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `subtitle` varchar(191) NOT NULL,
  `categoryId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `foundations`
--

INSERT INTO `foundations` (`id`, `name`, `subtitle`, `categoryId`) VALUES
('1', 'Found-1', 'Found-1', '1'),
('2', 'Found-2', 'Found-2', '1'),
('3', 'Found-3', 'Found-3', '1'),
('4', 'Found-4', 'Found-4', '2'),
('5', 'Found-5', 'Found-5', '2'),
('6', 'Found-6', 'Found-6', '2'),
('7', 'Found-7', 'Found-7', '3'),
('8', 'Found-8', 'Found-8', '3'),
('9', 'Found-9', 'Found-9', '3');

-- --------------------------------------------------------

--
-- Table structure for table `functionalities`
--

CREATE TABLE `functionalities` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `subtitle` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `functionalities`
--

INSERT INTO `functionalities` (`id`, `name`, `subtitle`) VALUES
('1', 'Func-1', 'Func-1'),
('2', 'Func-2', 'Func-2'),
('3', 'Func-3', 'Func-3');

-- --------------------------------------------------------

--
-- Table structure for table `functionalitiesrequirements`
--

CREATE TABLE `functionalitiesrequirements` (
  `functionalityId` varchar(191) NOT NULL,
  `requirementId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `functionalitiesrequirements`
--

INSERT INTO `functionalitiesrequirements` (`functionalityId`, `requirementId`) VALUES
('1', '1'),
('1', '2'),
('1', '3'),
('2', '1'),
('3', '2'),
('3', '3');

-- --------------------------------------------------------

--
-- Table structure for table `functionalityorders`
--

CREATE TABLE `functionalityorders` (
  `id` varchar(191) NOT NULL,
  `funcationalityId` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `functionalityorders`
--

INSERT INTO `functionalityorders` (`id`, `funcationalityId`, `orderId`) VALUES
('06d794c4-012b-4b45-87b2-2cc2260f8b85', '2', 'cc9accf8-68d0-48f5-8870-adbab33a58ad'),
('5ddd508a-f6fe-4492-852b-e261c53570ec', '1', 'cc9accf8-68d0-48f5-8870-adbab33a58ad'),
('bf07a546-a768-4d04-bc7f-73af23fc36ed', '3', 'cc9accf8-68d0-48f5-8870-adbab33a58ad');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(191) NOT NULL,
  `hours` double NOT NULL,
  `cost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `hours`, `cost`) VALUES
('cc9accf8-68d0-48f5-8870-adbab33a58ad', 585, 17175);

-- --------------------------------------------------------

--
-- Table structure for table `platformorders`
--

CREATE TABLE `platformorders` (
  `id` varchar(191) NOT NULL,
  `platformId` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platformorders`
--

INSERT INTO `platformorders` (`id`, `platformId`, `orderId`) VALUES
('3f80d047-5dbd-4742-8c46-2430b87b1272', '2', 'cc9accf8-68d0-48f5-8870-adbab33a58ad'),
('4e4908f0-8897-4dcd-86be-98d298c5f31f', '1', 'cc9accf8-68d0-48f5-8870-adbab33a58ad');

-- --------------------------------------------------------

--
-- Table structure for table `platforms`
--

CREATE TABLE `platforms` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `subtitle` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `hourPrice` double NOT NULL,
  `hours` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platforms`
--

INSERT INTO `platforms` (`id`, `name`, `subtitle`, `image`, `hourPrice`, `hours`) VALUES
('1', 'Android', 'Android', 'Android', 25, 300),
('2', 'IOS', 'IOS', 'IOS', 35, 200),
('3', 'DESKTOP', 'DESKTOP', 'DESKTOP', 15, 100);

-- --------------------------------------------------------

--
-- Table structure for table `platformsfoundations`
--

CREATE TABLE `platformsfoundations` (
  `platformId` varchar(191) NOT NULL,
  `foundationId` varchar(191) NOT NULL,
  `hours` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platformsfoundations`
--

INSERT INTO `platformsfoundations` (`platformId`, `foundationId`, `hours`) VALUES
('1', '1', 10),
('1', '2', 10),
('1', '3', 10),
('1', '4', 10),
('1', '5', 10),
('1', '6', 10),
('1', '7', 10),
('1', '8', 10),
('1', '9', 10),
('2', '1', 15),
('2', '2', 15),
('2', '3', 15),
('2', '4', 15),
('2', '5', 15),
('2', '6', 15),
('2', '7', 15),
('2', '8', 15),
('2', '9', 15),
('3', '1', 20),
('3', '2', 20),
('3', '3', 20),
('3', '4', 20),
('3', '5', 20),
('3', '6', 20),
('3', '7', 20),
('3', '8', 20),
('3', '9', 20);

-- --------------------------------------------------------

--
-- Table structure for table `platformsfunctionalities`
--

CREATE TABLE `platformsfunctionalities` (
  `platformId` varchar(191) NOT NULL,
  `functionalityId` varchar(191) NOT NULL,
  `hours` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platformsfunctionalities`
--

INSERT INTO `platformsfunctionalities` (`platformId`, `functionalityId`, `hours`) VALUES
('1', '1', 10),
('1', '2', 15),
('1', '3', 5),
('2', '1', 20),
('2', '2', 25),
('2', '3', 10),
('3', '1', 10),
('3', '2', 35),
('3', '3', 15);

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `subtitle` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requirements`
--

INSERT INTO `requirements` (`id`, `name`, `subtitle`) VALUES
('1', 'REQ-1', 'REQ-1'),
('2', 'REQ-2', 'REQ-2'),
('3', 'REQ-3', 'REQ-3');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b2767240-6aad-48e6-abc7-35b2f2a02ec1', '52a1e201c6612db987402a5752fbb6caf8a5a2ebf4a0e68ed047bc206fa6667a', '2023-03-13 12:46:24.095', '20230313054431_', NULL, NULL, '2023-03-13 12:46:24.033', 1),
('e9a0fe71-40b5-4f28-a0a4-3a326e38de1d', '3ec0e4f74a16c65ff8b1d67860e7632dcb58e27d37cfa4f6ff42683c78e86879', '2023-03-13 12:46:23.000', '20230312152305_', NULL, NULL, '2023-03-13 12:46:22.975', 1),
('ecb52acb-55a9-4424-a9bb-6cff349b63b3', '9b210ba10a93dc3dc9aef05425145d12301d6d8721130857174771a5553a5031', '2023-03-13 12:46:23.592', '20230312163846_', NULL, NULL, '2023-03-13 12:46:23.003', 1),
('f8473585-93d1-4825-96b1-0c4024a9e9ea', 'd7e2a2c213b8832535430c53fb25b6c168aaae56d6b0d5f81c08f2f54941d406', '2023-03-13 12:46:24.029', '20230313054132_', NULL, NULL, '2023-03-13 12:46:23.598', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foundationorders`
--
ALTER TABLE `foundationorders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FoundationOrders_orderId_fkey` (`orderId`),
  ADD KEY `FoundationOrders_foundationId_fkey` (`foundationId`);

--
-- Indexes for table `foundations`
--
ALTER TABLE `foundations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Foundations_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `functionalities`
--
ALTER TABLE `functionalities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `functionalitiesrequirements`
--
ALTER TABLE `functionalitiesrequirements`
  ADD PRIMARY KEY (`functionalityId`,`requirementId`),
  ADD KEY `FunctionalitiesRequirements_requirementId_fkey` (`requirementId`);

--
-- Indexes for table `functionalityorders`
--
ALTER TABLE `functionalityorders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FunctionalityOrders_orderId_fkey` (`orderId`),
  ADD KEY `FunctionalityOrders_funcationalityId_fkey` (`funcationalityId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platformorders`
--
ALTER TABLE `platformorders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PlatformOrders_platformId_fkey` (`platformId`),
  ADD KEY `PlatformOrders_orderId_fkey` (`orderId`);

--
-- Indexes for table `platforms`
--
ALTER TABLE `platforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platformsfoundations`
--
ALTER TABLE `platformsfoundations`
  ADD PRIMARY KEY (`platformId`,`foundationId`),
  ADD KEY `PlatformsFoundations_foundationId_fkey` (`foundationId`);

--
-- Indexes for table `platformsfunctionalities`
--
ALTER TABLE `platformsfunctionalities`
  ADD PRIMARY KEY (`platformId`,`functionalityId`),
  ADD KEY `PlatformsFunctionalities_functionalityId_fkey` (`functionalityId`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `foundationorders`
--
ALTER TABLE `foundationorders`
  ADD CONSTRAINT `FoundationOrders_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `foundations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FoundationOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `foundations`
--
ALTER TABLE `foundations`
  ADD CONSTRAINT `Foundations_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `functionalitiesrequirements`
--
ALTER TABLE `functionalitiesrequirements`
  ADD CONSTRAINT `FunctionalitiesRequirements_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `requirements` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FunctionalitiesRequirements_requirementId_fkey` FOREIGN KEY (`requirementId`) REFERENCES `functionalities` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `functionalityorders`
--
ALTER TABLE `functionalityorders`
  ADD CONSTRAINT `FunctionalityOrders_funcationalityId_fkey` FOREIGN KEY (`funcationalityId`) REFERENCES `functionalities` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FunctionalityOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `platformorders`
--
ALTER TABLE `platformorders`
  ADD CONSTRAINT `PlatformOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PlatformOrders_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `platformsfoundations`
--
ALTER TABLE `platformsfoundations`
  ADD CONSTRAINT `PlatformsFoundations_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `foundations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PlatformsFoundations_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `platformsfunctionalities`
--
ALTER TABLE `platformsfunctionalities`
  ADD CONSTRAINT `PlatformsFunctionalities_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `functionalities` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `PlatformsFunctionalities_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `platforms` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
