-- CreateTable
CREATE TABLE `chat` (
    `id_chat` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `senderId`(`senderId`),
    INDEX `receiverId`(`receiverId`),
    PRIMARY KEY (`id_chat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;
