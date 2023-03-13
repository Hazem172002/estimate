/*
  Warnings:

  - You are about to drop the column `price` on the `platforms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `platforms` DROP COLUMN `price`;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Foundations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformsFoundations` (
    `platformId` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,

    PRIMARY KEY (`platformId`, `foundationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformsFunctionalities` (
    `platformId` VARCHAR(191) NOT NULL,
    `functionalityId` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,

    PRIMARY KEY (`platformId`, `functionalityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Functionalities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirements` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FunctionalitiesRequirements` (
    `functionalityId` VARCHAR(191) NOT NULL,
    `requirementId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`functionalityId`, `requirementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Foundations` ADD CONSTRAINT `Foundations_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformsFoundations` ADD CONSTRAINT `PlatformsFoundations_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformsFoundations` ADD CONSTRAINT `PlatformsFoundations_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `Platforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformsFunctionalities` ADD CONSTRAINT `PlatformsFunctionalities_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformsFunctionalities` ADD CONSTRAINT `PlatformsFunctionalities_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `Platforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FunctionalitiesRequirements` ADD CONSTRAINT `FunctionalitiesRequirements_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Requirements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FunctionalitiesRequirements` ADD CONSTRAINT `FunctionalitiesRequirements_requirementId_fkey` FOREIGN KEY (`requirementId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
