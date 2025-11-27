-- =====================================================
-- Academic Management System - Insert Script
-- =====================================================

USE academic_db;

-- =====================================================
-- Insert Dummy Data: users
-- =====================================================
INSERT INTO users (email, password, full_name, role, provider, provider_id) VALUES
('admin@academic.edu', 'Admin@1234', 'John Doe', 'admin', 'local', NULL),
('employee@academic.edu', 'Employee@1234', 'Jane Foster', 'employee', 'local', NULL),
('student1@academic.edu', 'Student@1234', 'Alice', 'student', 'local', NULL),
('student2@academic.edu', 'Student@1234', 'Bob', 'student', 'local', NULL),
('faculty@academic.edu', 'Faculty@1234', 'Dr. Michael Professor', 'faculty', 'local', NULL),
('google.user@gmail.com', NULL, 'Sarah Google User', 'student', 'google', 'google_12345');

-- =====================================================
-- Insert Dummy Data: specialisation
-- =====================================================
INSERT INTO specialisation (specialisation_id, code, name, description, year, credits_required) VALUES
(1, 'CS', 'Theory & Systems', 'Focuses on theoretical foundations of computer science including algorithms, complexity theory, and system design', 2, 18),
(2, 'DS', 'Data Science', 'Specialization in data analysis, machine learning, and big data technologies', 2, 18),
(3, 'AI', 'Artificial Intelligence', 'Advanced study in AI, neural networks, and intelligent systems', 2, 20),
(4, 'SE', 'Software Engineering', 'Emphasis on software development methodologies, architecture, and best practices', 2, 18),
(5, 'CY', 'Cyber Security', 'Focus on information security, cryptography, and secure system design', 2, 20);

-- =====================================================
-- Insert Dummy Data: courses
-- =====================================================
INSERT INTO courses (course_id, course_code, name, description, year, term, faculty, credits, capacity) VALUES
-- Theory & Systems Courses
(101, 'CS501', 'Advanced Algorithms', 'Study of advanced algorithmic techniques and complexity analysis', 2, 'Fall', 'Dr. Arjun Sharma', 4, 50),
(102, 'CS502', 'Operating Systems Design', 'In-depth study of operating system design and implementation', 2, 'Spring', 'Prof. Lakshmi Iyer', 4, 45),
(103, 'CS503', 'Computer Architecture', 'Advanced computer architecture and system design', 2, 'Fall', 'Dr. Jayant Narlikar', 3, 40),
(104, 'CS504', 'Compiler Design', 'Theory and practice of compiler construction', 2, 'Spring', 'Prof. Gayatri Menon', 4, 35),

-- Data Science Courses
(201, 'DS511', 'Machine Learning', 'Fundamentals of machine learning algorithms and applications', 2, 'Fall', 'Dr. Amit Singhal', 4, 60),
(202, 'DS512', 'Big Data Analytics', 'Processing and analyzing large-scale datasets', 2, 'Spring', 'Prof. Deepa Kumar', 3, 50),
(203, 'DS513', 'Statistical Methods', 'Advanced statistical methods for data analysis', 2, 'Fall', 'Dr. Ramesh Rao', 3, 45),
(204, 'DS514', 'Data Visualization', 'Techniques for effective data visualization and storytelling', 2, 'Spring', 'Prof. Eswaran Subrahmanian', 3, 40),
(205, 'DS515', 'Deep Learning', 'Neural networks and deep learning architectures', 2, 'Fall', 'Dr. Geeta Anand', 4, 55),

-- Artificial Intelligence Courses
(301, 'AI521', 'Neural Networks', 'Architecture and training of neural networks', 2, 'Fall', 'Dr. Yashwant Gupta', 4, 45),
(302, 'AI522', 'Natural Language Processing', 'Processing and understanding human language', 2, 'Spring', 'Prof. Neha Chawla', 4, 40),
(303, 'AI523', 'Computer Vision', 'Image processing and computer vision techniques', 2, 'Fall', 'Dr. Fatima Sheikh', 4, 42),
(304, 'AI524', 'Robotics', 'Autonomous systems and robotic control', 2, 'Spring', 'Prof. Rajesh Kumar', 4, 30),

-- Software Engineering Courses
(401, 'SE531', 'Software Architecture', 'Design patterns and architectural styles', 2, 'Fall', 'Dr. Ganesh Natarajan', 4, 50),
(402, 'SE532', 'Agile Development', 'Agile methodologies and DevOps practices', 2, 'Spring', 'Prof. Kavita Krishnan', 3, 45),
(403, 'SE533', 'Software Testing', 'Testing strategies and quality assurance', 2, 'Fall', 'Dr. Govind Mishra', 3, 40),
(404, 'SE534', 'Cloud Computing', 'Cloud platforms and distributed systems', 2, 'Spring', 'Prof. Vikram Sarabhai', 4, 55),

-- Cyber Security Courses
(501, 'CY541', 'Cryptography', 'Mathematical foundations of cryptographic systems', 2, 'Fall', 'Dr. Waseem Khan', 4, 40),
(502, 'CY542', 'Network Security', 'Securing computer networks and communications', 2, 'Spring', 'Prof. Radhika Nagpal', 4, 45),
(503, 'CY543', 'Ethical Hacking', 'Penetration testing and security assessment', 2, 'Fall', 'Dr. Karthik Ram', 3, 35),
(504, 'CY544', 'Digital Forensics', 'Investigation and analysis of digital evidence', 2, 'Spring', 'Prof. Bhaskar Rao', 3, 30),

-- Common/Elective Courses
(601, 'GE551', 'Research Methodology', 'Methods and techniques for academic research', 2, 'Fall', 'Dr. Chandrasekhar Raman', 3, 100),
(602, 'GE552', 'Technical Writing', 'Professional and technical communication skills', 2, 'Spring', 'Prof. Wajid Ali', 2, 80);

-- =====================================================
-- Insert Dummy Data: specialisation_course
-- =====================================================
-- Theory & Systems (CS) - Courses (CSxxx)
INSERT INTO specialisation_course (id, specialisation_id, course_id) VALUES
(1, 1, 101),   -- Advanced Algorithms
(2, 1, 102),   -- Operating Systems Design
(3, 1, 103),   -- Computer Architecture
(4, 1, 104),   -- Compiler Design

-- Data Science (DS) - Courses (DSxxx)
(5, 2, 201),   -- Machine Learning
(6, 2, 202),   -- Big Data Analytics
(7, 2, 203),   -- Statistical Methods
(8, 2, 204),   -- Data Visualization
(9, 2, 205),   -- Deep Learning

-- Artificial Intelligence (AI) - Courses (AIxxx)
(10, 3, 301),  -- Neural Networks
(11, 3, 302),  -- Natural Language Processing
(12, 3, 303),  -- Computer Vision
(13, 3, 304),  -- Robotics

-- Software Engineering (SE) - Courses (SExxx)
(14, 4, 401),  -- Software Architecture
(15, 4, 402),  -- Agile Development
(16, 4, 403),  -- Software Testing
(17, 4, 404),  -- Cloud Computing

-- Cyber Security (CY) - Courses (CYxxx)
(18, 5, 501),  -- Cryptography
(19, 5, 502),  -- Network Security
(20, 5, 503),  -- Ethical Hacking
(21, 5, 504);  -- Digital Forensicshodology
