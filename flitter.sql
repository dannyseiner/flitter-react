-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 20, 2022 at 05:18 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` mediumint(9) NOT NULL,
  `account_role` tinyint(4) NOT NULL DEFAULT '1',
  `account_name` char(50) NOT NULL,
  `account_email` char(120) NOT NULL,
  `account_password` varchar(100) NOT NULL,
  `account_fastlogin_key` varchar(300) NOT NULL,
  `account_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_role`, `account_name`, `account_email`, `account_password`, `account_fastlogin_key`, `account_created`) VALUES
(1, 2, 'Admin', 'admin@admin.com', 'sha1$2e98e7f4$1$53668f147c3538103f04bad0e26ad7b1d5ec5745', '', '2021-10-11 18:21:53'),
(2, 1, 'dannyseiner', 'dannyseiner@gmail.com', 'sha1$2e98e7f4$1$53668f147c3538103f04bad0e26ad7b1d5ec5745', 'dannyseiner', '2021-11-01 22:07:50'),
(16, 1, 'testovaci ucet', 'testovaciucet@gmail.com', 'sha1$88249496$1$6c14ed87160143ccff7038dd57916714a716593c', '', '2021-11-07 15:20:28'),
(19, 1, 'jan port', 'janport@admin.cz', 'sha1$de88ddbe$1$e4730fa5e76ae1f54b91b60452bda970c9e2a0f0', '', '2021-11-22 18:23:24');

--
-- Triggers `accounts`
--
DELIMITER $$
CREATE TRIGGER `insert_into_settings` AFTER INSERT ON `accounts` FOR EACH ROW BEGIN 
INSERT INTO account_settings (meta_key, meta_value, meta_header, user_id) VALUES ("Dark Mode", 0,0, NEW.account_id);

INSERT INTO account_settings (meta_key, meta_value, meta_header, user_id) VALUES ("Allow all people to be able to see your posts", 0,0, NEW.account_id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account_friends`
--

CREATE TABLE `account_friends` (
  `id_friendship` int(11) NOT NULL,
  `id_user1` smallint(6) NOT NULL,
  `id_user2` smallint(6) NOT NULL,
  `friendship_status` tinyint(1) NOT NULL DEFAULT '0',
  `friendship_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_friends`
--

INSERT INTO `account_friends` (`id_friendship`, `id_user1`, `id_user2`, `friendship_status`, `friendship_created`) VALUES
(35, 1, 19, 0, '2022-04-13 18:11:49'),
(42, 2, 16, 0, '2022-04-13 18:48:22'),
(43, 2, 19, 0, '2022-04-13 18:51:58'),
(44, 1, 16, 0, '2022-04-13 21:52:36'),
(46, 1, 2, 1, '2022-04-17 14:36:16');

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

CREATE TABLE `account_info` (
  `info_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` char(40) NOT NULL,
  `city` char(30) NOT NULL,
  `zip` mediumint(6) NOT NULL,
  `country` char(30) NOT NULL,
  `phone` int(9) NOT NULL,
  `phone_code` mediumint(3) NOT NULL,
  `account_image` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`info_id`, `user_id`, `street`, `city`, `zip`, `country`, `phone`, `phone_code`, `account_image`) VALUES
(1, 2, 'Luční 306/3', 'Dubí', 41702, 'Czechia', 774439291, 11, ''),
(2, 1, 'adminStreet', 'adminCity', 69420, 'adminCountry', 420420420, 469, ''),
(4, 16, 'Street', 'City', 11142, 'Country', 123456789, 123, NULL),
(5, 19, 'port', 'port', 1111, 'port', 123123123, 123, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `account_role`
--

CREATE TABLE `account_role` (
  `role_id` int(11) NOT NULL,
  `role_name` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_role`
--

INSERT INTO `account_role` (`role_id`, `role_name`) VALUES
(1, 'standard'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `account_settings`
--

CREATE TABLE `account_settings` (
  `meta_id` int(11) NOT NULL,
  `meta_key` char(100) NOT NULL,
  `meta_value` tinyint(1) NOT NULL DEFAULT '0',
  `meta_header` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_settings`
--

INSERT INTO `account_settings` (`meta_id`, `meta_key`, `meta_value`, `meta_header`, `user_id`) VALUES
(1, 'dark_mode', 1, 'Dark mode', 2),
(2, 'allow_all_see_posts', 0, 'Allow all people to be albe to see your posts', 2),
(3, 'private_account', 1, 'Private Account ', 2),
(4, 'fast_access', 1, 'Allow fast access into account', 2);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `event_title` char(230) NOT NULL,
  `event_description` text NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `author_id`, `event_title`, `event_description`, `event_date`, `event_time`) VALUES
(1, 1, 'testing event', 'testing event description ', '2022-03-17', '15:25:55'),
(2, 1, '2222', 'maturitka :)', '2022-03-21', '17:57:43'),
(3, 1, 'testing same dates', 'aaflafkwmnflw ;fjf jqkl;f;nwKF WFMWN FLKWnf klwFN Kjw;ef wekFLEWkf ;wl', '2022-03-17', '15:35:55'),
(4, 1, 'a[osfmkpf', 'wenmfwemngf we', '2022-03-22', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `event_status`
--

CREATE TABLE `event_status` (
  `event_status_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fastaccess`
--

CREATE TABLE `fastaccess` (
  `access_id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `ipaddress` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fastaccess`
--

INSERT INTO `fastaccess` (`access_id`, `account_id`, `ipaddress`, `status`, `created`) VALUES
(29608, 2, '127.0.0.1', 0, '2021-12-27 23:37:03'),
(243726, NULL, '', 0, '2021-12-27 16:27:12'),
(558587, 2, '', 0, '2021-12-27 23:17:59'),
(583603, 2, '', 0, '2021-12-27 16:53:06'),
(1136421, NULL, '', 0, '2021-12-27 16:23:40'),
(2136023, 2, '', 0, '2021-12-27 16:37:47'),
(2464171, 2, '127.0.0.1', 0, '2022-02-08 17:27:19'),
(2637039, 2, '127.0.0.1', 0, '2022-01-11 09:46:31'),
(3587431, NULL, '127.0.0.1', 0, '2022-01-03 09:38:06'),
(3656482, 2, '127.0.0.1', 0, '2022-01-11 09:49:48'),
(3893921, 2, '', 0, '2021-12-27 16:50:40'),
(3955090, 2, '', 0, '2021-12-27 16:31:01'),
(4425075, 2, '127.0.0.1', 0, '2022-01-20 23:39:35'),
(4670469, 2, '127.0.0.1', 0, '2021-12-27 23:35:13'),
(5372853, 2, '127.0.0.1', 0, '2022-01-25 13:59:05'),
(5516579, 2, '127.0.0.1', 0, '2022-02-10 07:56:30'),
(5557643, NULL, '127.0.0.1', 0, '2022-03-10 22:50:16'),
(5582042, NULL, 'undefined', 0, '2021-12-27 23:28:05'),
(6307492, NULL, '', 0, '2021-12-27 16:37:20'),
(6689152, 2, '', 0, '2021-12-27 16:47:48'),
(6730524, 2, '127.0.0.1', 0, '2021-12-27 23:37:32'),
(6911633, 2, '127.0.0.1', 0, '2022-02-06 14:16:29'),
(7144996, NULL, '', 0, '2021-12-27 16:23:35'),
(7460764, 2, '', 0, '2021-12-27 16:43:46'),
(7856435, 2, '127.0.0.1', 0, '2022-01-03 09:42:37'),
(8292707, NULL, '127.0.0.1', 0, '2022-01-20 23:41:56'),
(9621931, 2, '127.0.0.1', 0, '2022-02-06 14:15:28'),
(9909787, 2, '127.0.0.1', 0, '2022-01-20 23:46:23');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `user_id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longtitude` double NOT NULL,
  `latitudeDelta` double NOT NULL,
  `longitudeDelta` double NOT NULL,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`user_id`, `latitude`, `longtitude`, `latitudeDelta`, `longitudeDelta`, `last_update`, `active`) VALUES
(1, 37.785834, -122.406417, 0.0922, 0.0421, '2022-04-17 13:33:04', 1),
(2, 50.66845038499561, 13.810584018553882, 0.0922, 0.0421, '2022-04-10 13:47:34', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `friendship_id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `friendship_id`, `from_id`, `message`, `created`) VALUES
(1, 26, 2, 'Aho;a', '2022-02-14 09:35:58'),
(2, 26, 2, 'wsup', '2022-02-14 09:36:32'),
(3, 26, 1, 'kk', '2022-02-14 09:39:16'),
(4, 26, 2, 'aaaa', '2022-02-14 13:01:10'),
(5, 26, 2, 'asd', '2022-02-15 20:27:56'),
(6, 26, 2, 'dd', '2022-02-15 20:28:08'),
(7, 26, 2, 'more', '2022-02-15 20:38:07'),
(8, 26, 2, 'spoc', '2022-02-15 20:43:11'),
(9, 26, 1, 'Nicefunguj to ?', '2022-02-15 20:43:19'),
(10, 26, 1, 'Venice dobe ', '2022-02-15 20:43:27'),
(11, 26, 2, 'spypcc', '2022-02-15 20:44:13'),
(12, 26, 1, 'Salsas if', '2022-02-15 20:44:19'),
(13, 26, 1, 'Scoop more', '2022-02-15 20:44:31'),
(14, 26, 2, 'bˇ', '2022-02-15 20:44:44'),
(15, 26, 2, 'kkk', '2022-02-15 20:44:50'),
(16, 26, 1, 'Cc', '2022-02-15 20:44:54'),
(17, 26, 1, 'Asd', '2022-02-15 20:45:45'),
(18, 26, 1, 'Add', '2022-02-15 20:46:40'),
(19, 26, 2, 'sicid', '2022-02-15 20:47:22'),
(20, 26, 1, 'A', '2022-02-15 20:49:10'),
(23, 26, 1, 'Jack se mad ', '2022-02-15 20:57:43'),
(24, 26, 1, 'Pepe?', '2022-02-15 21:04:08'),
(26, 20, 1, 'Show', '2022-02-15 21:28:25'),
(30, 26, 1, 'Add', '2022-02-21 12:46:52'),
(31, 26, 2, 'nnn', '2022-02-21 12:46:56'),
(32, 26, 1, 'Ooo', '2022-02-21 12:47:15'),
(35, 26, 2, 'wtf', '2022-02-21 12:48:37'),
(36, 26, 2, 'n', '2022-02-21 12:49:06'),
(37, 26, 1, 'Show jam she mad ', '2022-02-21 12:49:26'),
(38, 26, 2, 'bb', '2022-02-21 12:50:15'),
(39, 26, 2, 'ahjj', '2022-02-21 12:50:29'),
(40, 26, 1, 'Jack se mad ', '2022-02-21 12:50:37'),
(41, 26, 1, 'As', '2022-02-21 12:50:57'),
(42, 26, 2, 'nj', '2022-02-21 12:51:01'),
(43, 26, 2, 'mii', '2022-02-21 12:51:32'),
(44, 26, 1, 'As', '2022-02-21 12:51:58'),
(45, 26, 2, 'n', '2022-02-21 12:52:02'),
(46, 26, 1, 'Hi', '2022-02-21 12:52:10'),
(47, 26, 1, 'Assuming', '2022-02-21 12:52:57'),
(48, 26, 2, 'vbb', '2022-02-21 12:53:25'),
(49, 26, 1, 'In', '2022-02-21 12:53:34'),
(50, 26, 1, 'Add', '2022-02-21 12:55:30'),
(51, 26, 2, 'nn', '2022-02-21 12:55:33'),
(52, 26, 1, 'Add', '2022-02-21 12:56:07'),
(53, 26, 2, 'g', '2022-02-21 12:56:13'),
(54, 26, 1, 'He', '2022-02-21 12:56:19'),
(55, 26, 2, 'pop', '2022-02-21 12:57:28'),
(56, 26, 1, 'Regards', '2022-02-21 12:57:32'),
(57, 26, 1, 'As', '2022-02-21 12:59:46'),
(58, 26, 2, '  nn', '2022-02-21 13:00:03'),
(59, 26, 1, 'Omen ', '2022-02-21 13:00:12'),
(60, 26, 1, 'Pepe', '2022-02-21 13:01:43'),
(61, 26, 2, 'copal', '2022-02-21 13:01:49'),
(62, 26, 2, 'n', '2022-02-21 13:01:53'),
(63, 26, 1, 'Add', '2022-02-21 13:02:44'),
(64, 26, 2, 'hhh', '2022-02-21 13:02:48'),
(65, 26, 1, 'Assuming', '2022-02-21 13:03:30'),
(66, 26, 1, 'Prasopes', '2022-02-21 13:03:45'),
(67, 26, 2, 'wou', '2022-02-21 13:03:51'),
(68, 26, 0, '?', '2022-02-21 13:06:00'),
(69, 26, 0, 'more', '2022-02-21 13:06:04'),
(70, 26, 0, 'mm', '2022-02-21 13:06:07'),
(71, 26, 1, 'Add', '2022-02-21 13:06:38'),
(72, 26, 1, 'Add', '2022-02-21 13:07:15'),
(73, 26, 1, 'Ll]', '2022-02-21 13:07:49'),
(74, 26, 1, 'Pores', '2022-02-21 13:07:54'),
(75, 26, 2, 'bbbb', '2022-02-21 13:08:21'),
(76, 26, 1, 'Hi', '2022-02-21 13:08:27'),
(77, 26, 2, 'b', '2022-02-21 13:08:31'),
(79, 26, 2, 'hh', '2022-02-21 13:12:05'),
(80, 26, 1, 'Co?', '2022-02-21 13:12:10'),
(81, 26, 1, 'Show', '2022-02-21 13:12:34'),
(82, 26, 1, 'As', '2022-02-21 13:13:20'),
(84, 26, 1, 'Jack se Daneska mad', '2022-02-21 13:13:53'),
(86, 26, 1, 'Pepe go', '2022-02-21 13:18:56'),
(91, 26, 1, ';Kim', '2022-02-21 13:20:58'),
(95, 26, 2, 'coo', '2022-02-21 13:22:37'),
(96, 26, 2, 'jj', '2022-02-21 13:22:58'),
(97, 26, 2, 'k', '2022-02-21 13:22:58'),
(99, 26, 1, 'Sssdd', '2022-02-21 20:56:21'),
(100, 26, 1, 'Asdf', '2022-02-21 22:40:40'),
(103, 26, 1, 'Show', '2022-02-22 09:44:28'),
(104, 26, 2, ' pepego', '2022-02-22 09:44:32'),
(105, 26, 1, 'Wet', '2022-02-22 19:49:18'),
(107, 26, 1, 'Dobro more ', '2022-02-23 16:12:56'),
(109, 26, 1, 'Aaa', '2022-02-23 18:04:40'),
(110, 26, 1, 'fff', '2022-02-23 20:02:50'),
(112, 26, 1, 'Pepe go', '2022-02-24 13:27:56'),
(113, 26, 2, 'nnn', '2022-02-24 13:28:30'),
(114, 26, 2, 'lol', '2022-02-24 13:30:13'),
(115, 26, 2, 'f', '2022-02-24 13:30:18'),
(116, 26, 1, 'Did', '2022-02-24 13:30:42'),
(118, 26, 2, '<SHAREPOST/23>', '2022-02-24 14:56:17'),
(120, 26, 2, 'lmao', '2022-02-24 15:23:35'),
(122, 26, 2, 'jh', '2022-02-24 15:24:10'),
(124, 26, 2, 'vvv', '2022-02-24 15:24:54'),
(125, 26, 1, '<SHAREPOST/17>', '2022-02-24 15:25:15'),
(133, 26, 2, 'fungje ? ', '2022-02-24 15:52:50'),
(137, 26, 1, 'Add', '2022-02-25 00:01:51'),
(138, 26, 2, 'a', '2022-02-26 10:51:55'),
(139, 26, 1, 'Adds', '2022-03-09 18:29:23'),
(140, 26, 2, 'dd', '2022-03-09 18:29:31'),
(141, 26, 1, 'As', '2022-03-09 18:29:38'),
(142, 26, 2, 'dd', '2022-03-09 18:29:48'),
(143, 26, 1, 'S', '2022-03-09 18:29:55'),
(144, 26, 2, 'a', '2022-03-09 18:30:04'),
(145, 26, 1, '<SHAREPOST/23>', '2022-03-09 18:30:27'),
(147, 26, 2, 'Add', '2022-03-22 21:48:17'),
(149, 26, 1, 'dd', '2022-03-24 21:38:11'),
(150, 26, 1, 'lol', '2022-03-28 10:54:49'),
(151, 26, 2, 'M', '2022-03-29 09:14:18'),
(152, 26, 2, 'Dad adds', '2022-03-29 11:05:53'),
(153, 26, 2, 'Morning gas oadm ad ', '2022-03-29 11:05:58'),
(154, 26, 2, 'taso more ', '2022-03-29 11:06:43'),
(155, 26, 1, 'Ok melee srackty ', '2022-03-29 11:07:09'),
(156, 26, 2, 'jj', '2022-03-29 11:07:14'),
(157, 26, 1, 'L)', '2022-03-29 11:07:17'),
(162, 26, 2, 'bbb', '2022-04-10 14:46:11'),
(163, 26, 2, '<SHAREPOST/17>', '2022-04-10 14:48:59'),
(164, 40, 2, 'ahoj', '2022-04-13 18:17:45'),
(165, 40, 2, '♥️', '2022-04-13 18:17:56'),
(166, 26, 1, 'Add', '2022-04-13 22:27:10'),
(167, 26, 2, 'gg', '2022-04-13 22:27:35'),
(168, 26, 1, 'I', '2022-04-13 22:27:39'),
(169, 26, 1, 'Ahoj kocko', '2022-04-16 00:03:01'),
(170, 26, 2, 'cau parku', '2022-04-16 00:03:09'),
(171, 46, 1, 'Tasso', '2022-04-17 14:37:03'),
(172, 46, 1, 'Jan he', '2022-04-17 14:37:09'),
(173, 46, 2, 'hej', '2022-04-17 14:38:05'),
(174, 46, 2, 'co delas? ', '2022-04-17 14:38:08'),
(175, 46, 1, 'At', '2022-04-17 14:38:12'),
(176, 46, 1, 'Add', '2022-04-17 14:38:22'),
(177, 46, 2, ' okej', '2022-04-17 14:38:27'),
(178, 46, 2, '<SHAREPOST/28>', '2022-04-17 14:38:46');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `not_id` int(11) NOT NULL,
  `account_id` mediumint(9) NOT NULL,
  `not_header` char(70) NOT NULL,
  `not_link` varchar(200) DEFAULT NULL,
  `not_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`not_id`, `account_id`, `not_header`, `not_link`, `not_created`) VALUES
(7, 1, 'You have recieved new like', 'post/10', '2022-01-20 23:19:35'),
(8, 2, 'You have recieved new like', 'post/6', '2022-01-20 23:21:51'),
(10, 16, 'You\'r post has been updated', '/post/3', '2022-01-25 13:57:52'),
(12, 2, 'You\'r post has been updated', '/post/17', '2022-02-09 09:19:48'),
(13, 2, 'You\'r post has been updated', '/post/17', '2022-02-09 09:19:50'),
(14, 2, 'You\'r post has been updated', '/post/17', '2022-02-09 09:23:47'),
(15, 2, 'You\'r post has been updated', '/post/17', '2022-02-09 09:24:13'),
(16, 2, 'Your post has been updated', '/post/18', '2022-02-09 19:26:40'),
(17, 2, 'Your post has been updated', '/post/26', '2022-02-23 15:55:34'),
(18, 2, 'Your post has been updated', '/post/26', '2022-02-23 15:58:18'),
(19, 1, 'Your post has been updated', '/post/25', '2022-02-23 15:59:24'),
(20, 1, 'Your post has been updated', '/post/25', '2022-02-23 15:59:36'),
(21, 2, 'Your post has been updated', '/post/23', '2022-02-23 16:30:14'),
(22, 1, 'Your post has been updated', '/post/25', '2022-02-23 18:01:44'),
(23, 1, 'Your post has been updated', '/post/27', '2022-02-25 00:02:36'),
(24, 2, 'Your post has been updated', '/post/15', '2022-03-09 18:24:00'),
(25, 2, 'Your post has been updated', '/post/17', '2022-04-09 21:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `place_name` char(120) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `latitudeDelta` double NOT NULL,
  `longitudeDelta` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`place_id`, `user_id`, `place_name`, `latitude`, `longitude`, `latitudeDelta`, `longitudeDelta`) VALUES
(1, 1, 'taso more', 50.63388455628734, 13.830514148201075, 0.0922, 0.0421),
(2, 1, 'Test', 50.63388455629345, 13.830514148201102, 0.0922, 0.0421),
(7, 2, 'Lidl', 50.673613971405075, 14.047729547701024, 0.0922, 0.0421),
(8, 2, 'řeznictví JV', 50.67264312576137, 14.050090735392374, 0.0922, 0.0421);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

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
(3, 16, 'c o v i * d afgrgrg', 'test inserting post ', '2021-11-15 22:21:49'),
(5, 1, 'c @#o2 v i * d afgrgrg', 'asdafgewgwg', '2021-11-15 22:23:06'),
(6, 2, 'ads test test', 'asd test testdsadasda', '2021-11-15 22:24:07'),
(7, 1, 'tesgin senf', 'dqsfgew[k[ef ', '2021-11-15 22:26:33'),
(8, 2, 'asasd', 'adsdsaads', '2021-11-15 22:27:25'),
(9, 2, 'last test', 'upadter testovani', '2021-11-15 22:29:02'),
(10, 1, 'prispevek', 'ahojx', '2022-01-10 22:12:49'),
(11, 1, 'prispevek', 'ahojx', '2022-01-10 22:12:52'),
(16, 2, 'vytvoreni prispevku test', 'ahoj jak se mas', '2022-02-09 09:19:12'),
(17, 2, 'prasopes je hezke zvire fuj', 'ahoj jak s  c o@vidasd covidak 2022', '2022-02-09 09:19:29'),
(23, 2, 'iphone xr', 'pridavam cisla ', '2022-02-15 23:03:27'),
(28, 1, 'Prospered', 'Asdoodao ', '2022-03-09 18:32:32'),
(29, 2, 'Kockopes', 'denywek', '2022-04-16 00:02:17');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `comment_id` int(11) NOT NULL,
  `comment_post_id` mediumint(9) NOT NULL,
  `comment_author_id` smallint(6) NOT NULL,
  `comment_on_comment_id` mediumint(9) NOT NULL DEFAULT '0',
  `comment_content` varchar(300) NOT NULL,
  `comment_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`comment_id`, `comment_post_id`, `comment_author_id`, `comment_on_comment_id`, `comment_content`, `comment_created`) VALUES
(1, 1, 1, 0, 'Testing comments', '2021-11-08 15:16:20'),
(2, 1, 1, 0, 'testing input', '2021-11-08 17:28:33'),
(3, 1, 2, 0, 'this is just a test comment ', '2021-11-08 17:33:23'),
(4, 1, 2, 0, 'testing recall', '2021-11-08 17:35:27'),
(5, 1, 2, 0, 'sned another one', '2021-11-08 17:36:40'),
(6, 1, 1, 0, 'asd', '2021-11-10 11:45:05'),
(7, 1, 1, 0, 'asd', '2021-11-10 11:45:05'),
(8, 1, 1, 0, 'asdsad', '2021-11-10 22:21:00'),
(9, 1, 2, 0, 'SELECT * FROM account WHERE account_id = 1', '2021-11-12 08:54:05'),
(10, 1, 2, 0, 's', '2021-11-12 08:54:15'),
(11, 1, 2, 0, 'ahoj ja jsem karel', '2021-12-27 23:20:12'),
(12, 1, 2, 0, 'testovani komentare s reloadem', '2021-12-27 23:21:05'),
(13, 1, 2, 0, 'dasdada', '2021-12-27 23:38:14'),
(14, 1, 2, 0, 'pepega', '2021-12-27 23:39:32'),
(15, 6, 2, 0, 'Ahoj pridavam komentar ', '2022-01-10 11:06:01'),
(16, 6, 2, 0, 'Ahoj pridavam komentar ', '2022-01-10 11:06:02'),
(17, 6, 2, 0, 'pridavam dasli negre', '2022-01-10 11:06:49'),
(18, 6, 2, 0, 'ss', '2022-01-10 11:19:18'),
(19, 6, 2, 0, 'asd', '2022-01-10 11:20:35'),
(20, 10, 2, 0, 'Komentar :)', '2022-01-25 10:50:46'),
(24, 17, 2, 0, 'bgg', '2022-02-10 07:57:41'),
(25, 17, 2, 0, 'retarde', '2022-02-19 18:08:29'),
(26, 17, 2, 0, 'jjj', '2022-02-19 18:10:26'),
(28, 17, 2, 0, 'poppp', '2022-02-19 18:11:15'),
(29, 23, 1, 0, 'iPhone trash', '2022-02-24 14:17:05'),
(31, 23, 1, 0, '', '2022-02-24 14:19:26'),
(34, 6, 1, 0, 'Task more ', '2022-02-24 23:48:26'),
(43, 28, 1, 0, 'Asd', '2022-03-09 18:32:42'),
(44, 23, 2, 0, 'This trash ', '2022-04-02 23:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `like_id` int(11) NOT NULL,
  `like_post_id` mediumint(9) NOT NULL,
  `like_account_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`like_id`, `like_post_id`, `like_account_id`) VALUES
(8, 1, 2),
(11, 1, 1),
(60, 9, 2),
(107, 11, 2),
(138, 6, 2),
(139, 7, 2),
(140, 5, 2),
(143, 10, 1),
(144, 11, 1),
(147, 23, 1),
(149, 8, 2),
(150, 16, 2),
(152, 17, 2),
(158, 6, 1),
(162, 28, 1),
(164, 10, 2),
(165, 17, 1),
(166, 29, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD KEY `account_role` (`account_role`);

--
-- Indexes for table `account_friends`
--
ALTER TABLE `account_friends`
  ADD PRIMARY KEY (`id_friendship`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`info_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `account_role`
--
ALTER TABLE `account_role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `account_settings`
--
ALTER TABLE `account_settings`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `event_status`
--
ALTER TABLE `event_status`
  ADD PRIMARY KEY (`event_status_id`);

--
-- Indexes for table `fastaccess`
--
ALTER TABLE `fastaccess`
  ADD PRIMARY KEY (`access_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `from_id` (`from_id`),
  ADD KEY `friendship_id` (`friendship_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`not_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`place_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_author_id` (`post_author_id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comment_post_id` (`comment_post_id`),
  ADD KEY `comment_author_id` (`comment_author_id`),
  ADD KEY `comment_on_comment` (`comment_on_comment_id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `post_id` (`like_post_id`),
  ADD KEY `author_id` (`like_account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `account_friends`
--
ALTER TABLE `account_friends`
  MODIFY `id_friendship` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `account_role`
--
ALTER TABLE `account_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `account_settings`
--
ALTER TABLE `account_settings`
  MODIFY `meta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_status`
--
ALTER TABLE `event_status`
  MODIFY `event_status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fastaccess`
--
ALTER TABLE `fastaccess`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9909788;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `not_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `place_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_author_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
