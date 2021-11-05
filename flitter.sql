-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 05, 2021 at 04:40 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flitter`
--
CREATE DATABASE IF NOT EXISTS `flitter` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `flitter`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `account_id` mediumint(9) NOT NULL,
  `account_name` char(50) NOT NULL,
  `account_email` char(120) NOT NULL,
  `account_password` varchar(100) NOT NULL,
  `account_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_name`, `account_email`, `account_password`, `account_created`) VALUES
(2, 'admin', 'admin@admin.com', 'sha1$2e98e7f4$1$53668f147c3538103f04bad0e26ad7b1d5ec5745', '2021-10-11 18:21:53'),
(5, 'dannyseiner', 'dannyseiner@gmail.com', 'sha1$2e98e7f4$1$53668f147c3538103f04bad0e26ad7b1d5ec5745', '2021-11-01 22:07:50'),
(6, '123123', '333123@gmail.com', '$2y$10$DuyFY4rpZS8xV/l8VG//9O0hJTLtQZgScLIUSVVjRBVER6hfxZzI.', '2021-11-01 22:09:56'),
(7, 'asdasdsa', 'dannyse123diner@gmail.com', '$2y$10$nfkU5nCQkce1Pjijzz7LY.GQlBGxSnlv/a8ZGYIzaXaXXQkAJ6wHy', '2021-11-01 22:10:46'),
(8, '2132', 'danasdnyseiner@gmail.com', '$2y$10$ZCkCSQO7dDZpGOp2bbWlE.6lyMIlXC//GF3I0b9h7XJPatNB6NVLi', '2021-11-01 22:11:29'),
(9, 'sadasd', 'asdsad', 'sha1$23571549$1$0cbc8621038a34e0779918998954293cb35c22d7', '2021-11-03 18:40:26'),
(10, 'testing@', 'test', 'sha1$a9ba2768$1$57ead44997ff9f530a321ccf2390f03c78fd34ff', '2021-11-03 18:41:59'),
(11, 'asd', 'asd', 'sha1$b20a9e47$1$671c9faf2401bed0f88a132f616e663fb2edf1c1', '2021-11-03 18:48:13'),
(12, 'ej fd', 'asdnf', 'sha1$1f6c7da2$1$9f0959b4af5f27686a200c8da51278bab354c73a', '2021-11-03 18:49:00'),
(13, 'adskm', 'oij', 'sha1$49ec03b7$1$6ace3d76179f68a989fa081be988f2e2096e60ac', '2021-11-03 18:50:22'),
(14, '', 'undefined', '', '2021-11-04 11:56:16'),
(15, 'test', 'test@admin.com', 'sha1$2e5eddf4$1$12816cab8df9e5f36c6f2ceaa00939fe84ddd70f', '2021-11-04 12:04:19');

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

DROP TABLE IF EXISTS `account_info`;
CREATE TABLE `account_info` (
  `info_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` char(40) NOT NULL,
  `city` char(30) NOT NULL,
  `zip` mediumint(6) NOT NULL,
  `country` char(30) NOT NULL,
  `phone` int(9) NOT NULL,
  `phone_code` mediumint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`info_id`, `user_id`, `street`, `city`, `zip`, `country`, `phone`, `phone_code`) VALUES
(1, 8, 'Luční 306/3', 'Dubí', 41702, 'Czechia', 774439291, 11);

-- --------------------------------------------------------

--
-- Table structure for table `account_settings`
--

DROP TABLE IF EXISTS `account_settings`;
CREATE TABLE `account_settings` (
  `setttings_id` int(11) NOT NULL,
  `settings_account_id` int(11) NOT NULL,
  `dark_mode` tinyint(1) NOT NULL,
  `accept_requests` tinyint(1) NOT NULL,
  `show_friends` tinyint(1) NOT NULL,
  `show_email` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `not_id` int(11) NOT NULL,
  `account_id` mediumint(9) NOT NULL,
  `not_header` char(70) NOT NULL,
  `not_content` varchar(250) NOT NULL,
  `not_link` varchar(200) DEFAULT NULL,
  `not_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_author_id` mediumint(9) NOT NULL,
  `post_title` char(100) NOT NULL,
  `post_content` varchar(200) NOT NULL,
  `post_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_author_id`, `post_title`, `post_content`, `post_created`) VALUES
(1, 5, 'Testing api server title', 'Testing api server content title Testing api server content title Testing api server content title Testing api server content title ', '2021-11-03 11:30:38'),
(2, 2, 'Testing api', 'Testing api LOREM INPSUNLOREM INPSUNLOREM INPSUNLOREM INPSUNLOREM INPSUNLOREM INPSUNLOREM INPSUNLOREM INPSUN ', '2021-11-03 11:31:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`info_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `account_settings`
--
ALTER TABLE `account_settings`
  ADD PRIMARY KEY (`setttings_id`),
  ADD KEY `settings_account_id` (`settings_account_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`not_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_author_id` (`post_author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `account_settings`
--
ALTER TABLE `account_settings`
  MODIFY `setttings_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `not_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
