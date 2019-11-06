-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 06/11/2019 às 19:41
-- Versão do servidor: 10.4.8-MariaDB
-- Versão do PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sensoreamento`
--
CREATE DATABASE IF NOT EXISTS `sensoreamento` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sensoreamento`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Data`
--

CREATE TABLE `Data` (
  `oid` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `value` double NOT NULL,
  `streamData` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONAMENTOS PARA TABELAS `Data`:
--   `streamData`
--       `Stream` -> `oid`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Sensor`
--

CREATE TABLE `Sensor` (
  `oid` int(11) NOT NULL,
  `key` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `userSensor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONAMENTOS PARA TABELAS `Sensor`:
--   `userSensor`
--       `User` -> `oid`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Stream`
--

CREATE TABLE `Stream` (
  `oid` int(11) NOT NULL,
  `key` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `sensorStream` int(11) NOT NULL,
  `unitStream` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONAMENTOS PARA TABELAS `Stream`:
--   `sensorStream`
--       `Sensor` -> `oid`
--   `unitStream`
--       `Unit` -> `oid`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Unit`
--

CREATE TABLE `Unit` (
  `oid` int(11) NOT NULL,
  `label` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONAMENTOS PARA TABELAS `Unit`:
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `User`
--

CREATE TABLE `User` (
  `oid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELACIONAMENTOS PARA TABELAS `User`:
--

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `Data`
--
ALTER TABLE `Data`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `streamData` (`streamData`);

--
-- Índices de tabela `Sensor`
--
ALTER TABLE `Sensor`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `userSensor` (`userSensor`);

--
-- Índices de tabela `Stream`
--
ALTER TABLE `Stream`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `sensorStream` (`sensorStream`),
  ADD KEY `unitStream` (`unitStream`);

--
-- Índices de tabela `Unit`
--
ALTER TABLE `Unit`
  ADD PRIMARY KEY (`oid`);

--
-- Índices de tabela `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`oid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `Data`
--
ALTER TABLE `Data`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Sensor`
--
ALTER TABLE `Sensor`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Stream`
--
ALTER TABLE `Stream`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Unit`
--
ALTER TABLE `Unit`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `User`
--
ALTER TABLE `User`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `Data`
--
ALTER TABLE `Data`
  ADD CONSTRAINT `Data_ibfk_1` FOREIGN KEY (`streamData`) REFERENCES `Stream` (`oid`);

--
-- Restrições para tabelas `Sensor`
--
ALTER TABLE `Sensor`
  ADD CONSTRAINT `Sensor_ibfk_1` FOREIGN KEY (`userSensor`) REFERENCES `User` (`oid`);

--
-- Restrições para tabelas `Stream`
--
ALTER TABLE `Stream`
  ADD CONSTRAINT `Stream_ibfk_1` FOREIGN KEY (`sensorStream`) REFERENCES `Sensor` (`oid`),
  ADD CONSTRAINT `Stream_ibfk_2` FOREIGN KEY (`unitStream`) REFERENCES `Unit` (`oid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
