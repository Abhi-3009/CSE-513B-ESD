-- =====================================================
-- Database Setup Script for Academic ERP
-- =====================================================
-- This script creates the MySQL user and database
-- Run this as MySQL root user first, then run database_setup.sql
-- =====================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS academic_db;

-- Create the user 'abhijeet' with password 'Pass@123'
-- Drop user if exists to avoid errors
DROP USER IF EXISTS 'abhijeet'@'localhost';
CREATE USER 'abhijeet'@'localhost' IDENTIFIED BY 'Pass@123';

-- Grant all privileges on academic_db to user abhijeet
GRANT ALL PRIVILEGES ON academic_db.* TO 'abhijeet'@'localhost';

-- Apply the privilege changes
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT User, Host FROM mysql.user WHERE User = 'abhijeet';

-- Show the database
SHOW DATABASES LIKE 'academic_db';

-- Success message
SELECT 'Database user setup complete! You can now run database_setup.sql' AS Status;
