-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hover_item" TEXT NOT NULL,
    "active_presence" TEXT NOT NULL,
    "top_nav_text" TEXT NOT NULL,
    "active_item" TEXT NOT NULL,
    "column_bg" TEXT NOT NULL,
    "mention_badge" TEXT NOT NULL,
    "active_item_text" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "top_nav_bg" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groups" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);
