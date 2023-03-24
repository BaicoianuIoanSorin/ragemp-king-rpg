-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: mart. 24, 2023 la 09:28 PM
-- Versiune server: 10.4.27-MariaDB
-- Versiune PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `ragemp`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `money` int(20) NOT NULL DEFAULT 5000,
  `moneyBank` int(20) NOT NULL DEFAULT 5000,
  `premiumPoints` int(11) NOT NULL DEFAULT 0,
  `admin` int(11) NOT NULL DEFAULT 0,
  `helper` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `experience` int(11) NOT NULL DEFAULT 0,
  `needExperience` int(11) NOT NULL DEFAULT 300,
  `hours` int(11) NOT NULL DEFAULT 0,
  `modelPlayer` varchar(100) NOT NULL DEFAULT 'a_m_y_beachvesp_01',
  `playerPremium` int(11) NOT NULL DEFAULT 0,
  `playerWarns` int(11) NOT NULL DEFAULT 0,
  `drivingLicense` int(11) NOT NULL DEFAULT 0,
  `job` int(11) NOT NULL DEFAULT -1,
  `house` int(11) NOT NULL DEFAULT -1,
  `business` int(11) NOT NULL DEFAULT 999,
  `mute` int(11) NOT NULL DEFAULT 0,
  `spawnChange` int(11) NOT NULL DEFAULT 0,
  `playerGroup` int(11) NOT NULL DEFAULT -1,
  `playerGroupRank` int(11) NOT NULL DEFAULT 0,
  `playerGroupFP` int(11) NOT NULL DEFAULT 0,
  `playerGroupWarns` int(11) NOT NULL DEFAULT 0,
  `playerGroupDays` int(11) NOT NULL DEFAULT 0,
  `wanted` int(11) NOT NULL DEFAULT 0,
  `wantedTime` int(11) NOT NULL DEFAULT 0,
  `wantedCrimes` varchar(100) NOT NULL DEFAULT '',
  `wantedCrimeTime` varchar(100) NOT NULL DEFAULT '',
  `wantedCaller` varchar(100) NOT NULL DEFAULT '',
  `water` int(11) NOT NULL DEFAULT 100,
  `food` int(11) NOT NULL DEFAULT 100,
  `sex` varchar(50) NOT NULL DEFAULT 'Male',
  `skin` varchar(50) NOT NULL DEFAULT 'a_m_y_beachvesp_01',
  `vehicleSlots` int(11) NOT NULL DEFAULT 2,
  `totalVehs` int(11) NOT NULL DEFAULT 0,
  `playerLastOnline` varchar(100) NOT NULL DEFAULT 'no last login',
  `status` int(11) NOT NULL DEFAULT 0,
  `phoneNumber` varchar(10) NOT NULL DEFAULT '',
  `lastSpawnX` float NOT NULL DEFAULT -1041.15,
  `lastSpawnY` float NOT NULL DEFAULT -2744.27,
  `lastSpawnZ` float NOT NULL DEFAULT 21.359,
  `lastSpawnA` float NOT NULL DEFAULT 327.559,
  `playerCrimes` int(11) NOT NULL DEFAULT 0,
  `playerArrests` int(11) NOT NULL DEFAULT 0,
  `helperChat` int(11) NOT NULL DEFAULT 1,
  `groupChat` int(11) NOT NULL DEFAULT 1,
  `hudStatus` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
