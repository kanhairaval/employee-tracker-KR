SELECT 
  employees.employee_id AS id, 
  employees.first_name, 
  employees.last_name, 
  roles.job_title, 
  departments.department_name, 
  roles.role_salary AS salary, 
  CONCAT(managers.first_name, ' ', managers.last_name) AS reporting_manager 
FROM 
  employees 
  JOIN roles ON employees.id_role = roles.role_id 
  JOIN departments ON roles.dep_id = departments.id 
  LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id 
GROUP BY 
  employees.employee_id;