-- =====================================================
-- Academic Management System - Create Script
-- =====================================================

DROP DATABASE IF EXISTS academic_db;
CREATE DATABASE academic_db;
USE academic_db;

-- =====================================================
-- Table: users
-- =====================================================
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50),
    provider VARCHAR(50),
    provider_id VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: courses
-- =====================================================
CREATE TABLE courses (
    course_id INT NOT NULL,
    course_code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    term VARCHAR(30),
    faculty VARCHAR(50),
    credits INT,
    capacity INT,
    PRIMARY KEY (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: specialisation
-- =====================================================
CREATE TABLE specialisation (
    specialisation_id INT NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    year INT,
    credits_required INT,
    PRIMARY KEY (specialisation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Table: specialisation_course (Junction Table)
-- =====================================================
CREATE TABLE specialisation_course (
    id INT NOT NULL,
    specialisation_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (specialisation_id) REFERENCES specialisation(specialisation_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
