DROP DATABASE IF EXISTS crm_db;
CREATE DATABASE crm_db;

USE crm_db;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL
);

CREATE TABLE interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    interaction_date DATE,
    type ENUM('call', 'email', 'meeting') NOT NULL,
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
