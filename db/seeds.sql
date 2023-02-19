INSERT INTO departments (department_name)
VALUES ("Corporate"),
       ("Quality Control"),
       ("Customer Service"),
       ("Sales"),
       ("Accounting"),
       ("HR"),
       ("Warehouse");

INSERT INTO roles (dep_id, job_title, role_salary)
VALUES (1, "Regional Manager", 70000),
       (4, "Sales Person", 55000),
       (6, "Branch head of HR", 60000),
       (3, "Customer Experience Associate", 35000),
       (5, "Accountant", 45000),
       (7, "Foreman", 65000),
       (2, "Quality Assurance", 50000),
       (1, "CFO", 150000),
       (1, "District VP", 120000),
       (1, "CEO", 200000),
       (1, "Head of HR", 90000);

INSERT INTO employees (first_name, last_name, id_role, manager_id)
VALUES ("Alan", "Brand", 10, NULL),
       ("David", "Wallace", 8, 1),
       ("Kendall", "Paul", 11, 1),
       ("Jan", "Levinson-Gould", 9, 2),
       ("Michael", "Scott", 1, 4),
       ("Dwight", "Schrute", 2, 5),
       ("Toby", "Flenderson", 3, 3),
       ("Kelly", "Kapoor", 4, 5),
       ("Kevin", "Malone", 5, 5),
       ("Daryl", "Philbin", 6, 5),
       ("Creed", "Bratton", 7, 5);