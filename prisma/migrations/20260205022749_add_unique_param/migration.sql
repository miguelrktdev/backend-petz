/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `opts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `reset_passwords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "opts_token_key" ON "opts"("token");

-- CreateIndex
CREATE UNIQUE INDEX "reset_passwords_token_key" ON "reset_passwords"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
