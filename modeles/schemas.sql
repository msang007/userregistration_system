-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2023 at 02:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `nom_role` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `id_role`) VALUES
(1, 'juneid gaffar', 'juneidgaff@gmail.com', '$2a$08$opQ6kknbObkWC8c.dlj2cu6EfJSZBxXm1MYHKKK.y94bLLs9pGtqC', 0),
(2, 'Sidi Sangare', 'sidisangare440@gmail.com', '$2a$08$cB3uLZgYE.lbfB1Qeo43jeqQh4g/aWI7RANli.ADfgVgru7IaJgj2', 0),
(3, 'Mamadou Sangare', 'msang007@gmail.com', '$2a$08$nEXh.TlPCgrNePRT3nwE4ePe1zk7Mpn.sE5hX7MucGhfNogkel1ve', 0),
(4, 'Mamadou Diaw', 'MamadDiaw55@gmail.com', '$2a$08$IuxOQ2w1RTZjiZrWK478YOWfB0lIOcQEcfgBGjr.oyVc1RvOrwCHe', 0),
(5, 'Mehdi', 'Mehdi@gmail.com', '$2a$08$nLj.XQREv9oCtQ0Xm6abM.Q/aH9BJMl56AQBZ/Q2I/0G8ZiKzHcuq', 0),
(6, 'Lobna Kaci', 'LobnaKac007@gmail.com', '$2a$08$kpo1Wy/YqqRcwCgac7ZlvOMAnmtCghXopWgL45AWBsjT.WLLRRFs.', 0),
(7, 'Zackaria Ghnm', 'ZackGhnm@gmail.com', '$2a$08$YthdIhNmhyqYD18dN0b0d.BSgMJONrJoKNicExGeO.JgE1FN7AzRu', 0),
(8, 'astan', 'astan123@gmail.com', '$2a$08$q5pbKxxliJ1jeQmcMdbL/ewm/SR2PpNsptjWwjZ5gFEnG0rAgavie', 0),
(9, 'Mamadou Sangare', 'mamadou.sangare31@icloud.com', '$2a$08$ICt92WSLV8ARymBxtnTvDOLY1TpZHX7oiJhI9ROau521rVOAhg4Wu', 0),
(10, 'Lamine Traore', 'LamineTraore123@yahoo.fr', '$2a$08$v0hEgiICh.WGttcAjVRIpupWRGs486XI1OmCT0V8PlecUXzrra3FC', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`),
  ADD KEY `fk_ck` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `fk_ck` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
