#!/bin/bash
cd auth-project
npx prisma generate
 service mysql start
 mysql -u root -p -e "create database demoauth;"
 mysql -u root -p  -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Mehrab@123';"
 mysql -u root -p Mehrab@123 -e "CREATE USER 'mehrab'@'localhost' IDENTIFIED BY 'Mehrab@123';"
 npx prisma db push
 npm run dev
