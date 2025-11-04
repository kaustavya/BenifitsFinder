-- MySQL initialization script for BenefitsFinder
CREATE DATABASE IF NOT EXISTS benefitsfinder;
USE benefitsfinder;

-- Example table: users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example table: eligibility_submissions
CREATE TABLE IF NOT EXISTS eligibility_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  submission_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
docker compose -f backend/docker-compose.yml up -d db