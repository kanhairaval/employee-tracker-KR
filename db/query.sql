SELECT 
  departments.department_name AS department, 
  employees.employee_id AS id, 
  employees.first_name, 
  employees.last_name, 
  roles.job_title AS title, 
  roles.role_salary AS salary
FROM 
  employees 
  JOIN roles ON employees.id_role = roles.role_id 
  JOIN departments ON roles.dep_id = departments.id 
ORDER BY 
  departments.department_name;
