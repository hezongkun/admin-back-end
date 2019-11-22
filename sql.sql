/*
 Navicat Premium Data Transfer

 Source Server Type    : MySQL
 Source Server Version : 100222

 Target Server Type    : MySQL
 Target Server Version : 100222
 File Encoding         : 65001

 Date: 22/11/2019 16:44:10
*/
-- sys_user

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(6) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
  `username` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_bin DEFAULT NULL,
  `nickname` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `headpic` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `role_id` int(3) DEFAULT NULL,
  `state` int(1) DEFAULT 1 COMMENT '0:禁用，1:启用',
  `last_login_time` datetime DEFAULT NULL,
  `last_logout_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '0:未删除，1:已删除',
  `delete_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`) USING BTREE,
  KEY `user_role_id` (`role_id`),
  CONSTRAINT `user_role_id` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, 'admin', '403bde1d093f8e84377f9ccac5b40f4f', '15311110101', '大白兔奶头', NULL, 1, 1, NULL, NULL, 0, NULL, '2019-10-29 16:10:28', '2019-11-22 15:04:05');
INSERT INTO `sys_user` VALUES (2, '1111114', '$2a$10$J7wPdJ9l/egtRGZZqdMC0eMe5xSG0sZygvHAhPllLpIDa15c.5lVW', '15311110102', '111', NULL, 1, 1, NULL, NULL, 0, NULL, '2019-11-16 23:50:12', '2019-11-22 16:02:03');
INSERT INTO `sys_user` VALUES (7, '1112', '$2a$10$dDWwC.4w15JKjtLEWu7En.h39XPGg80zVo/XDn/zVMCcdggSVhNLq', '111', '111', NULL, 1, 1, NULL, NULL, 0, NULL, '2019-11-17 00:03:36', '2019-11-22 14:10:30');
INSERT INTO `sys_user` VALUES (16, '111234', '$2a$10$uRhHcx6SMbjLqEBsJBHvbeq9aCcXKrcTYEZ15B4QuV5ixzC1/Nldi', '11111', '111', NULL, 2, 1, NULL, NULL, 1, '2019-11-20 11:46:15', '2019-11-17 00:20:52', '2019-11-20 11:46:15');
INSERT INTO `sys_user` VALUES (17, '111111', '$2a$10$vam3xh502hqrTgXG0kuraOtvh74xX24qp1AsmuGyZ/R448z7sQ5Uy', '111111', '111111', NULL, 1, 1, NULL, NULL, 1, '2019-11-17 14:22:39', '2019-11-17 00:48:03', '2019-11-17 14:22:39');
INSERT INTO `sys_user` VALUES (18, '1112232', '$2a$10$DewtmHlrDf4HPqBhNGAy7.eQcG8fWt7nVB4BRoKb/WzTuRiTnn2tK', '11131', '111', NULL, 1, 1, NULL, NULL, 1, '2019-11-17 14:21:46', '2019-11-17 12:32:43', '2019-11-17 14:21:46');
INSERT INTO `sys_user` VALUES (20, 'test', '$2a$10$i9vvc0LscQVWQ6q6n46P7OdTRxLIWHh6GCcXvEj/lCXXCFss3UsYy', '15311110103', 'aaaaa', NULL, 1, 1, NULL, NULL, 1, '2019-11-20 11:46:46', '2019-11-20 11:46:28', '2019-11-20 11:46:46');
INSERT INTO `sys_user` VALUES (21, '2222222', '$2a$10$0dbBJa4tkWpIqyCD8iFcIuUVCSOn0Fer8SpKInHya1IRQ3BbTATvy', '15311110105', 'test', NULL, 1, 1, NULL, NULL, 0, NULL, '2019-11-20 11:47:18', '2019-11-20 11:47:18');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;





-- sys_role


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `state` int(1) DEFAULT 0 COMMENT '0:未启用，1:已启用',
  `del_flag` int(1) DEFAULT 0 COMMENT '1:已删除',
  `delete_time` datetime DEFAULT NULL,
  `is_admin` int(1) DEFAULT 0 COMMENT '1:是admin',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `role_name` (`role_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (1, '超级管理员', 1, 0, NULL, 1, '2019-11-16 11:58:15', '2019-11-22 15:03:24');
INSERT INTO `sys_role` VALUES (2, 'test', 1, 0, NULL, 0, '2019-11-16 11:58:57', '2019-11-22 15:04:17');
INSERT INTO `sys_role` VALUES (3, 'test2', 0, 1, '2019-11-21 20:27:07', 0, '2019-11-21 20:24:08', '2019-11-21 20:27:07');
INSERT INTO `sys_role` VALUES (4, 'test3', 1, 1, '2019-11-21 20:27:28', 0, '2019-11-21 20:27:16', '2019-11-21 20:27:28');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;


-- sys_menu


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `permisson` varchar(255) COLLATE utf8mb4_bin NOT NULL COMMENT '权限标识',
  `state` int(1) DEFAULT 1 COMMENT '0:未启用，1:已启用',
  `icon` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `type` int(1) DEFAULT 0 COMMENT '菜单类型 0:其他，1:菜单',
  `sort` int(11) DEFAULT 0,
  `hidden` int(1) DEFAULT 1 COMMENT '1:显示 0:隐藏',
  `url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '外部链接',
  `parent_id` int(6) DEFAULT 1 COMMENT '父级id',
  `del_flag` int(1) DEFAULT 0 COMMENT '1:已删除',
  `delete_time` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `permisson` (`permisson`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES (1, '主菜单', '/', 'home', 1, NULL, 1, 0, 0, NULL, 0, 0, NULL, '2019-11-21 12:37:38', '2019-10-29 16:26:19');
INSERT INTO `sys_menu` VALUES (2, '系统管理', '/system', 'sys', 1, NULL, 1, 0, 1, NULL, 1, 0, NULL, '2019-11-22 09:23:06', '2019-11-17 17:16:38');
INSERT INTO `sys_menu` VALUES (3, '菜单管理', '/system/menu', 'sys.menu', 1, NULL, 1, 0, 1, NULL, 2, 0, NULL, '2019-11-21 15:25:07', '2019-11-17 16:24:25');
INSERT INTO `sys_menu` VALUES (6, '角色管理', '/system/role', 'sys.role', 1, NULL, 1, 0, 1, NULL, 2, 0, NULL, '2019-11-21 15:50:56', '2019-11-17 19:28:35');
INSERT INTO `sys_menu` VALUES (7, '管理员', '/system/user', 'sys.user', 1, NULL, 1, 11, 1, NULL, 2, 0, NULL, '2019-11-21 15:48:03', '2019-11-17 16:22:55');
INSERT INTO `sys_menu` VALUES (14, '查看', NULL, 'sys.menu.view', 1, NULL, 0, 0, 0, NULL, 3, 0, NULL, '2019-11-22 15:09:48', '2019-11-21 13:56:34');
INSERT INTO `sys_menu` VALUES (15, '添加', NULL, 'sys.menu.add', 1, NULL, 0, 0, 0, NULL, 3, 0, NULL, '2019-11-22 15:09:58', '2019-11-21 15:22:35');
INSERT INTO `sys_menu` VALUES (16, '修改', NULL, 'sys.menu.update', 1, NULL, 0, 0, 0, NULL, 3, 0, NULL, '2019-11-22 15:10:00', '2019-11-21 15:24:27');
INSERT INTO `sys_menu` VALUES (17, '删除', NULL, 'sys.menu.delete', 1, NULL, 0, 0, 0, NULL, 3, 0, NULL, '2019-11-22 15:10:01', '2019-11-21 15:24:43');
INSERT INTO `sys_menu` VALUES (18, '查看', NULL, 'sys.role.view', 1, NULL, 0, 0, 0, NULL, 6, 0, NULL, '2019-11-22 15:09:50', '2019-11-21 15:51:17');
INSERT INTO `sys_menu` VALUES (19, '添加', NULL, 'sys.role.add', 1, NULL, 0, 0, 0, NULL, 6, 0, NULL, '2019-11-22 15:10:03', '2019-11-21 15:51:35');
INSERT INTO `sys_menu` VALUES (20, '删除', NULL, 'sys.role.delete', 1, NULL, 0, 0, 0, NULL, 6, 0, NULL, '2019-11-22 15:10:05', '2019-11-21 15:51:49');
INSERT INTO `sys_menu` VALUES (21, '修改', NULL, 'sys.role.update', 1, NULL, 0, 0, 0, NULL, 6, 0, NULL, '2019-11-22 15:10:07', '2019-11-21 15:52:02');
INSERT INTO `sys_menu` VALUES (22, '查看', NULL, 'sys.user.view', 1, NULL, 0, 0, 0, NULL, 7, 0, NULL, '2019-11-22 15:09:52', '2019-11-21 15:56:02');
INSERT INTO `sys_menu` VALUES (23, '添加', NULL, 'sys.user.add', 1, NULL, 0, 0, 0, NULL, 7, 0, NULL, '2019-11-22 15:10:08', '2019-11-21 15:56:13');
INSERT INTO `sys_menu` VALUES (24, '修改', NULL, 'sys.user.update', 1, NULL, 0, 0, 0, NULL, 7, 0, NULL, '2019-11-22 15:10:10', '2019-11-21 15:56:26');
INSERT INTO `sys_menu` VALUES (25, '删除', NULL, 'sys.user.delete', 1, NULL, 0, 0, 0, NULL, 7, 0, NULL, '2019-11-22 15:10:12', '2019-11-21 15:56:37');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;




-- sys_role_menu


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `role_id` int(6) NOT NULL,
  `menu_id` int(6) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `menu_id` (`menu_id`),
  CONSTRAINT `menu_id` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES (190, 3, 1, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (191, 3, 2, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (192, 3, 3, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (193, 3, 14, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (194, 3, 15, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (195, 3, 16, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (196, 3, 17, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (197, 3, 6, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (198, 3, 18, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (199, 3, 19, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (200, 3, 20, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (201, 3, 21, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (202, 3, 7, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (203, 3, 22, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (204, 3, 23, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (205, 3, 24, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (206, 3, 25, '2019-11-21 20:26:50', NULL);
INSERT INTO `sys_role_menu` VALUES (207, 4, 1, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (208, 4, 2, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (209, 4, 3, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (210, 4, 14, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (211, 4, 15, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (212, 4, 16, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (213, 4, 17, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (214, 4, 6, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (215, 4, 18, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (216, 4, 19, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (217, 4, 20, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (218, 4, 21, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (219, 4, 7, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (220, 4, 22, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (221, 4, 23, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (222, 4, 24, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (223, 4, 25, '2019-11-21 20:27:24', NULL);
INSERT INTO `sys_role_menu` VALUES (224, 1, 14, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (225, 1, 17, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (226, 1, 23, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (227, 1, 7, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (228, 1, 25, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (229, 1, 22, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (230, 1, 24, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (231, 1, 1, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (232, 1, 2, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (233, 1, 3, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (234, 1, 15, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (235, 1, 16, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (236, 1, 6, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (237, 1, 18, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (238, 1, 19, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (239, 1, 20, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (240, 1, 21, '2019-11-22 09:18:56', NULL);
INSERT INTO `sys_role_menu` VALUES (289, 2, 14, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (290, 2, 18, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (291, 2, 6, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (292, 2, 19, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (293, 2, 20, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (294, 2, 21, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (295, 2, 22, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (296, 2, 7, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (297, 2, 23, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (298, 2, 24, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (299, 2, 25, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (300, 2, 16, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (301, 2, 15, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (302, 2, 17, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (303, 2, 3, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (304, 2, 2, '2019-11-22 13:40:40', NULL);
INSERT INTO `sys_role_menu` VALUES (305, 2, 1, '2019-11-22 13:40:40', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
