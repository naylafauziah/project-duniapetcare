/*
  Warnings:

  - You are about to drop the column `appointment_time` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `appointment_time`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `total_price` DECIMAL(10, 2) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `appointment_date` DATETIME NULL;
