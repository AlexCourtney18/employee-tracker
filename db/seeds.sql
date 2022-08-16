INSERT INTO departments (title)
VALUES
('Accounting'),
('Human Resources'),
('Marketing'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 60000, 1),
('Accounting Manager', 80000, 1),
('HR Rep', 50000, 2),
('HR Supervisor', 70000, 2),
('Brand Specialist', 55000, 3),
('Brand Manager', 75000, 3),
('Sales Person', 75000, 4),
('Regional Manager', 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Oscar', 'Martinez', 1, 3),
('Kevin', 'Malone', 1, 3),
('Angela', 'Martin', 2, 12),
('Toby', 'Flenderson', 3, 6),
('Holly', 'Flax', 3, 6),
('Kendall', 'Corporate', 4, 12),
('Kelly', 'Kapoor', 5, 8),
('Ryan', 'Howard', 6, 12),
('Jim', 'Halpert', 7, 12),
('Dwight', 'Schrute', 7, 12),
('Phyllis', 'Vance', 7, 12),
('Michael', 'Scott', 8, NULL);