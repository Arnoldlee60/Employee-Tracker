DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;
USE work_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  fName VARCHAR(100) NOT NULL,
  lName VARCHAR(100) NOT NULL,
  title VARCHAR(100) ,
  department VARCHAR(100) ,
  salary decimal(50, 2) ,
  manager VARCHAR(100),
  PRIMARY KEY (id)
);
INSERT INTO employees ( fname, lname, title, department, salary, manager)
VALUES 
('Arnold', 'Lee', 'Sales Lead', 'Engineering', 1000000, null),
('one', 'uno', 'Manager', 'Engineering', 22222, 'Arnold'),
('two', 'dos', 'Manager', 'Sales', 33333, 'Example1'),
('three', 'tres', 'Manager', 'Legal', 44444, 'Example2'),
('four', 'quatro', 'Manager', 'Finance', 55555, 'Example3')
;


/*

SELECT * FROM employees;

DELETE FROM employees WHERE fname = 'Example1';

SELECT fname FROM employees;

SELECT fname, lname FROM employees;

UPDATE employees
SET title = 'Manager'
WHERE fname = 'Arnold';

