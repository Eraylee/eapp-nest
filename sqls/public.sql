/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : PostgreSQL
 Source Server Version : 120001
 Source Host           : localhost:5432
 Source Catalog        : eapp
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120001
 File Encoding         : 65001

 Date: 07/08/2020 16:54:53
*/


-- ----------------------------
-- Sequence structure for casbin_rule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."casbin_rule_id_seq";
CREATE SEQUENCE "public"."casbin_rule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for menu_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."menu_id_seq";
CREATE SEQUENCE "public"."menu_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_id_seq";
CREATE SEQUENCE "public"."role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for casbin_rule
-- ----------------------------
DROP TABLE IF EXISTS "public"."casbin_rule";
CREATE TABLE "public"."casbin_rule" (
  "id" int4 NOT NULL DEFAULT nextval('casbin_rule_id_seq'::regclass),
  "ptype" varchar COLLATE "pg_catalog"."default",
  "v0" varchar COLLATE "pg_catalog"."default",
  "v1" varchar COLLATE "pg_catalog"."default",
  "v2" varchar COLLATE "pg_catalog"."default",
  "v3" varchar COLLATE "pg_catalog"."default",
  "v4" varchar COLLATE "pg_catalog"."default",
  "v5" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of casbin_rule
-- ----------------------------
INSERT INTO "public"."casbin_rule" VALUES (1, 'p', 'admin', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (2, 'p', 'admin', '/system/menu', NULL, NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (3, 'p', 'admin', '/system/menu/getTree', 'POST', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."menu";
CREATE TABLE "public"."menu" (
  "id" int4 NOT NULL DEFAULT nextval('menu_id_seq'::regclass),
  "sort" int2 NOT NULL DEFAULT 0,
  "enabled" int2 NOT NULL DEFAULT 1,
  "description" varchar(50) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamptz(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamptz(6),
  "name" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "action" varchar(30) COLLATE "pg_catalog"."default",
  "icon" varchar(50) COLLATE "pg_catalog"."default",
  "type" int2 NOT NULL DEFAULT 1,
  "path" varchar(100) COLLATE "pg_catalog"."default",
  "visiable" int2 NOT NULL DEFAULT 1,
  "mpath" varchar COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "parentId" int4
)
;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO "public"."menu" VALUES (1, 0, 1, NULL, '2020-08-07 16:44:17.026396+08', '2020-08-07 16:44:17.026396+08', NULL, '系统', NULL, 'SettingOutlined', 1, NULL, 1, '1.', NULL);
INSERT INTO "public"."menu" VALUES (5, 0, 1, NULL, '2020-08-07 16:47:52.900115+08', '2020-08-07 16:47:52.900115+08', NULL, '菜单', NULL, 'BarsOutlined', 3, '/system/menu', 1, '1.5.', 1);
INSERT INTO "public"."menu" VALUES (6, 0, 1, NULL, '2020-08-07 16:50:16.424078+08', '2020-08-07 16:50:16.424078+08', NULL, '获取个人菜单树', 'POST', NULL, 2, '/system/menu/getTree', 1, '1.5.6.', 5);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "timestamp" int8 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of migrations
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" int4 NOT NULL DEFAULT nextval('role_id_seq'::regclass),
  "sort" int2 NOT NULL DEFAULT 0,
  "enabled" int2 NOT NULL DEFAULT 1,
  "description" varchar(50) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamptz(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamptz(6),
  "name" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(30) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO "public"."role" VALUES (1, 0, 1, NULL, '2020-08-07 16:30:08.560552+08', '2020-08-07 16:30:08.560552+08', NULL, '超级管理员', 'admin');

-- ----------------------------
-- Table structure for role_menus_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_menus_menu";
CREATE TABLE "public"."role_menus_menu" (
  "roleId" int4 NOT NULL,
  "menuId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of role_menus_menu
-- ----------------------------
INSERT INTO "public"."role_menus_menu" VALUES (1, 1);
INSERT INTO "public"."role_menus_menu" VALUES (1, 5);
INSERT INTO "public"."role_menus_menu" VALUES (1, 6);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  "sort" int2 NOT NULL DEFAULT 0,
  "enabled" int2 NOT NULL DEFAULT 1,
  "description" varchar(50) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamptz(6) NOT NULL DEFAULT now(),
  "deletedAt" timestamptz(6),
  "username" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "nickname" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(50) COLLATE "pg_catalog"."default",
  "password" char(64) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(30) COLLATE "pg_catalog"."default" NOT NULL,
  "avatar" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES (1, 0, 1, NULL, '2020-08-07 16:29:42.919738+08', '2020-08-07 16:29:42.919738+08', NULL, 'admin', '管理员', 'string@qq.com', 'b946ccc987465afcda7e45b1715219711a13518d1f1663b8c53b848cb0143441', '15555555555', NULL);

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles_role";
CREATE TABLE "public"."user_roles_role" (
  "userId" int4 NOT NULL,
  "roleId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO "public"."user_roles_role" VALUES (1, 1);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."casbin_rule_id_seq"
OWNED BY "public"."casbin_rule"."id";
SELECT setval('"public"."casbin_rule_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."menu_id_seq"
OWNED BY "public"."menu"."id";
SELECT setval('"public"."menu_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."role_id_seq"
OWNED BY "public"."role"."id";
SELECT setval('"public"."role_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_id_seq"
OWNED BY "public"."user"."id";
SELECT setval('"public"."user_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table casbin_rule
-- ----------------------------
ALTER TABLE "public"."casbin_rule" ADD CONSTRAINT "PK_e147354d31e2748a3a5da5e3060" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "UQ_51b63874cdce0d6898a0b2150f2" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table role_menus_menu
-- ----------------------------
CREATE INDEX "IDX_eec9c5cb17157b2294fd9f0edb" ON "public"."role_menus_menu" USING btree (
  "roleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f1adc6be166630ee2476d7bbf0" ON "public"."role_menus_menu" USING btree (
  "menuId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table role_menus_menu
-- ----------------------------
ALTER TABLE "public"."role_menus_menu" ADD CONSTRAINT "PK_9513afcd070d9dda92b7616b228" PRIMARY KEY ("roleId", "menuId");

-- ----------------------------
-- Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username");
ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_roles_role
-- ----------------------------
CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "public"."user_roles_role" USING btree (
  "roleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "public"."user_roles_role" USING btree (
  "userId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_roles_role
-- ----------------------------
ALTER TABLE "public"."user_roles_role" ADD CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId");

-- ----------------------------
-- Foreign Keys structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "public"."menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table role_menus_menu
-- ----------------------------
ALTER TABLE "public"."role_menus_menu" ADD CONSTRAINT "FK_eec9c5cb17157b2294fd9f0edbf" FOREIGN KEY ("roleId") REFERENCES "public"."role" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."role_menus_menu" ADD CONSTRAINT "FK_f1adc6be166630ee2476d7bbf09" FOREIGN KEY ("menuId") REFERENCES "public"."menu" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_roles_role
-- ----------------------------
ALTER TABLE "public"."user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "public"."role" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
