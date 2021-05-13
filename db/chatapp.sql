-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Mai 2021 um 00:10
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `chatapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messages`
--

CREATE TABLE `messages` (
  `content` text DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `messages`
--

INSERT INTO `messages` (`content`, `from`, `to`, `id`, `timestamp`) VALUES
('seppl', 'hirte', 'hirte2', 1, '2021-05-05 16:38:13'),
('sadf', 'hirte', 'hirte2', 2, '2021-05-05 16:38:25'),
('f', 'hirte', 'hirte2', 3, '2021-05-05 16:38:28'),
('f', 'hirte', 'hirte2', 4, '2021-05-05 16:38:28'),
('asdf', 'hirte', 'hirte2', 5, '2021-05-05 16:38:54'),
('d', 'hirte', 'hirte2', 6, '2021-05-05 16:38:55'),
('d', 'hirte', 'hirte2', 7, '2021-05-05 16:38:55'),
('very important note', 'hirte', 'hirte2', 8, '2021-05-05 16:39:01'),
('asdf', 'hirte', 'hitler', 9, '2021-05-05 16:50:56'),
('asdf', 'hirte', 'hitler', 10, '2021-05-05 16:50:57'),
('asdf', 'hirte', 'hitler', 11, '2021-05-05 16:50:58'),
('hirentext', 'hirte2', 'hirte', 12, '2021-05-25 07:02:57'),
('finally', 'hirte', 'hirte2', 14, '2021-05-06 09:09:51'),
('f', 'hirte', 'hitler', 15, '2021-05-06 09:21:06'),
('test', 'hirte', 'hitler', 16, '2021-05-07 06:01:49'),
('test', 'hirte', 'hitler', 17, '2021-05-07 06:01:50'),
('test', 'hirte', 'hitler', 18, '2021-05-07 06:01:51'),
('hirtenmakaroni', 'hirte', 'hitler', 19, '2021-05-07 06:01:55'),
('hirtensepp', 'hirte', 'hitler', 20, '2021-05-07 06:01:59'),
('seppele peppele', 'hirte', 'hitler', 21, '2021-05-07 06:02:02'),
('asdf', 'hirte', 'simon1234', 22, '2021-05-07 06:03:22'),
('ddfsdfsdfsdf', 'hirte', 'simon1234', 23, '2021-05-07 06:03:27'),
('asdf', 'hirte', 'simon1234', 24, '2021-05-07 06:03:48'),
('asdf', 'hirte', 'simon1234', 25, '2021-05-07 06:03:49'),
('f', 'hirte', 'simon1234', 26, '2021-05-07 06:03:53'),
('dsdf', 'hirte', 'hirte2', 27, '2021-05-07 06:04:06'),
('asdf', 'hirte', 'hitler', 28, '2021-05-07 06:04:09'),
('f', 'hirte', 'hitler', 29, '2021-05-07 06:04:10'),
('f', 'hirte', 'hitler', 30, '2021-05-07 06:04:10'),
('f', 'hirte', 'username', 31, '2021-05-07 06:04:14'),
('f', 'hirte', 'username', 32, '2021-05-07 06:04:14'),
('f', 'hirte', 'username', 33, '2021-05-07 06:04:15'),
('f', 'hirte', 'username', 34, '2021-05-07 06:04:15'),
('adsf', 'hirte', 'username', 35, '2021-05-07 06:04:16'),
('hirtenseppele', 'hirte', 'hirte2', 36, '2021-05-10 10:21:17'),
('i numb this bitch', 'hirte', 'hirte2', 37, '2021-05-10 10:21:27'),
('can you hear me', 'hirte', 'hirte2', 38, '2021-05-10 10:21:31'),
('test test test', 'hirte', 'hirte2', 39, '2021-05-10 10:21:40'),
('do you get this`?', 'hirte', 'hirte2', 40, '2021-05-10 10:21:45'),
('do you event get this?', 'hirte', 'hirte2', 41, '2021-05-10 10:21:51'),
('hallo hirtensepp', 'hirte', 'hirtensepp', 42, '2021-05-10 10:22:21'),
('hello this is my first message how do you like it?', 'hirte', 'seppl234', 43, '2021-05-10 10:45:18');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`username`, `email`, `password`) VALUES
('hirte', 'hirte', 'hirte'),
('hirte2', 'hirteh', 'hirte'),
('hirtenmakaroni', 'hirte', '$2b$10$mv.pvjonenfLGZSBtLOOS.zlaef5qCFDqK51QNFSy0qzatCbsi4km'),
('hirtensepp', 'simon', 'öasldkfj'),
('hitler', 'hurensohn', '123'),
('schnipps', 'f', '1234'),
('seppl234', 'hirte', '123'),
('seppl235', 'hirte', '123'),
('sheeeeeeeesh', 'sepp', '123'),
('simon1234', 'simon', 'password'),
('testtest', 'hirte', '$2b$10$/LPse9btmFXp7GCyHlW31uu9ldaFmgZnbExNZlH2rp4Fd787/l0QK'),
('username', 'asdf', 'u'),
('userssdf', 'hirte', 'h');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `from` (`from`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`from`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
