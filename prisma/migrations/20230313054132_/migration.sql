-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(191) NOT NULL,
    `hours` VARCHAR(191) NOT NULL,
    `cost` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformOrders` (
    `id` VARCHAR(191) NOT NULL,
    `platformId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoundationOrders` (
    `id` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FunctionalityOrders` (
    `id` VARCHAR(191) NOT NULL,
    `funcationalityId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlatformOrders` ADD CONSTRAINT `PlatformOrders_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `Platforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformOrders` ADD CONSTRAINT `PlatformOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoundationOrders` ADD CONSTRAINT `FoundationOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoundationOrders` ADD CONSTRAINT `FoundationOrders_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FunctionalityOrders` ADD CONSTRAINT `FunctionalityOrders_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FunctionalityOrders` ADD CONSTRAINT `FunctionalityOrders_funcationalityId_fkey` FOREIGN KEY (`funcationalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
