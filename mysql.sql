DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;
USE work_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(100) NOT NULL,
  lName VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary decimal(50, 5) NOT NULL,
  manager VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM employees;



