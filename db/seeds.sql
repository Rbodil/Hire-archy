INSERT INTO TABLE department(name)
VALUES
    ('HR'),
    ('Technical Support'),
    ('Sales'),
    ('Accounting');

INSERT INTO TABLE role(title, salary, department_id)
VALUES
    ('HR Representative', '80000.00', '1'),
    ('Full Stack Developer', '85000.00', '2'),
    ('Sales Representative', '90000.00', '3'),
    ('Accounts Recievable 1', '80000.00', '4');

INSERT INTO TABLE employee (first_name, last_name, role_id)
VALUES
    ('Clark', 'Kent', '4'),
    ('Lois','Lane','1'),
    ('Lex','Luthor', '3'),
    ('Wally','West', '2');