-- =====================================================
-- Update Admin User Role
-- =====================================================
-- Run this script to set an admin role for your Google OAuth email

USE academic_db;

-- Update the email to match your Google OAuth email address
UPDATE users 
SET role = 'admin' 
WHERE email = 'raiabhijeet3009@gmail.com';

-- Verify the update
SELECT id, email, full_name, role, provider FROM users WHERE email = 'raiabhijeet3009@gmail.com';

-- Optional: Set all other Google users as students if they don't have a role
UPDATE users 
SET role = 'student' 
WHERE provider = 'google' AND (role IS NULL OR role = '');
