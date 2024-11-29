-- CreateTable
CREATE TABLE `artikel` (
    `id_artikel` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penulis` INTEGER NULL,
    `judul` VARCHAR(200) NULL,
    `content` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_penulis`(`id_penulis`),
    PRIMARY KEY (`id_artikel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id_booking` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NULL,
    `id_hewan` INTEGER NULL,
    `id_layanan` INTEGER NULL,
    `id_dokter` INTEGER NULL,
    `appointment_date` DATE NULL,
    `appointment_time` TIME(0) NULL,
    `status` ENUM('pending', 'confirmed', 'completed', 'canceled') NULL DEFAULT 'pending',

    INDEX `id_dokter`(`id_dokter`),
    INDEX `id_hewan`(`id_hewan`),
    INDEX `id_layanan`(`id_layanan`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_booking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `id_artikel` INTEGER NULL,
    `id_user` INTEGER NULL,
    `content` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_artikel`(`id_artikel`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokter` (
    `id_dokter` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NULL,
    `spesialisasi` VARCHAR(50) NULL,
    `experience_years` INTEGER NULL,
    `rating` DECIMAL(2, 1) NULL DEFAULT 0.0,

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_dokter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hewan` (
    `id_hewan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NULL,
    `nama_hewan` VARCHAR(50) NULL,
    `species` ENUM('dog', 'cat', 'other') NULL,
    `breed` VARCHAR(50) NULL,
    `age` INTEGER NULL,
    `weight` DECIMAL(5, 2) NULL,

    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_hewan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `layanan` (
    `id_layanan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_layanan` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `harga` DECIMAL(10, 2) NULL,
    `tipe_layanan` ENUM('grooming', 'konsultasi') NULL,

    PRIMARY KEY (`id_layanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `full_name` VARCHAR(100) NULL,
    `phone_number` VARCHAR(15) NULL,
    `role` ENUM('user', 'dokter', 'admin') NULL DEFAULT 'user',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`id_penulis`) REFERENCES `users`(`id_user`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`id_hewan`) REFERENCES `hewan`(`id_hewan`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`id_layanan`) REFERENCES `layanan`(`id_layanan`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_artikel`) REFERENCES `artikel`(`id_artikel`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dokter` ADD CONSTRAINT `dokter_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `hewan` ADD CONSTRAINT `hewan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;
