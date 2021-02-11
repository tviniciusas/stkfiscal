
USE `stkfiscal`;

DROP TABLE IF EXISTS `empresas`;

CREATE TABLE `empresas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `razao` varchar(255) DEFAULT NULL,
  `cnpj` varchar(255) DEFAULT NULL,
  `socioa` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `fiscali` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `telefone_fiscal` varchar(255) DEFAULT NULL,
  `email_fiscal` varchar(255) DEFAULT NULL,
  `contador` varchar(255) DEFAULT NULL,
  `loginsefaz` varchar(255) DEFAULT NULL,
  `senha_sefaz` varchar(255) DEFAULT NULL,
  `certificado_digital` varchar(255) DEFAULT NULL,
  `dt_cadastro` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `empresas` WRITE;

UNLOCK TABLES;


