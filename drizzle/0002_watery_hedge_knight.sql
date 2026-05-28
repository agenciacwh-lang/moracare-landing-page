ALTER TABLE `leads` ADD `sessionId` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `tipoPlano` enum('Individual','Familiar','PJ','MEI') NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `status` enum('Incompleto','Concluido') DEFAULT 'Incompleto' NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;