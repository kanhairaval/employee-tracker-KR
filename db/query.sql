SELECT 
  employees.employee_id AS id, 
  employees.first_name, 
  employees.last_name, 
  roles.job_title AS title, 
  departments.department_name AS department, 
  roles.role_salary AS salary, 
  CONCAT(first_name, ' ', last_name) AS manager 
FROM 
  employees
  GROUP BY 
  first_name,last_name
  LEFT JOIN employees ON employees.manager_id = employees.employee_id
  JOIN roles ON employees.id_role = roles.role_id
  JOIN departments ON roles.dep_id = departments.id;