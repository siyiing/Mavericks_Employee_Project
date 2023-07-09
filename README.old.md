# Mavericks: Employee Project

- `npx create-react-app . --template typescript`
- `npm install @mui/material @emotion/react @emotion/styled`
- `npm i react-redux @reactjs/toolkit`
- `npm redux-thunk @types/redux-thunk`
- `npm install @mui/icons-material @mui/material @emotion/styled @emotion/react`
- `npm i axois` 
- `npm i react-router-dom` 

# To Do

0. Database

- Department: departmentId (PK 1, 2, 3), name (HR, PS, admin)
- Employee: departmentId (FK of Department table)
- User: id (PK), username, password (hashed), departmentId

- 1 department has many employees
- 1 department has many users

- If user = HR, only display HR employee
- If user = PS, only display PS employee
- If user = admins, display all employee

1. Pagination

- if < 10 employees, no pagination
- if > 10 employees, show only 10 records and ensure page shown is correct
  -- if on first page, left button is disabled and right is enabled
  -- if on last page, left button is enabled and right is disabled

2. Add Employee Button

- goes to AddEmployee page
- fetch employees action when paged is opened

3. Edit Employee

- goes to AddEmployee page
- ensure that name, salary and department inputs are filled
- back button goes back to employee list page

4. AddEmployee Page

- input: name, salary, department
- button: submit

5. Delete Employee

- upon clicking, modal 'are you sure' is prompted
- click no, closes the modal
- click yes, calls deleteEmployee function and close the modal

6. Checks error

- empty name
- name with number
- empty salary
- non-number salary
- zero or negative salary
- empty department
- when unchanged, give error

Note.

- proper submission of new or edit employee will call the correct method with the correct parameter and navigate back to employee list page
