DROP DATABASE IF EXISTS employees_db;
-- Creates the employees_db database --
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  job_title VARCHAR(60) NOT NULL,
  role_salary DECIMAL NOT NULL,
  dep_id INT,
  FOREIGN KEY (dep_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  id_role INT,
  FOREIGN KEY (id_role)
  REFERENCES roles(role_id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employees(employee_id)
  ON DELETE SET NULL
);