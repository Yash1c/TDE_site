CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    age INT CHECK (age > 0), 
    password_hash VARCHAR(255) NOT NULL, 
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    token VARCHAR(32)
);

