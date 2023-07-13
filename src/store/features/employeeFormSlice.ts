import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { Department, EmployeeI } from "./employeeSlice";

interface EmployeeFormState {
  employee: EmployeeI; // for delete 
  success: boolean;
  name: string;
  department: Department;
  salary: number;
  nameError: string;
  departmentError: string;
  salaryError: string;
}

const initialState: EmployeeFormState = {
  employee: {name: '', department: Department.HR, salary: 0},
  success: false,
  name: "",
  department: Department.HR,
  salary: 0,
  nameError: "",
  departmentError:"",
  salaryError: ""
}

const setEmployeeData = (state: EmployeeFormState, action: PayloadAction<{empData: EmployeeI}>) => {
  state.employee = action.payload.empData;
} 

const setSuccess = (state: EmployeeFormState, action: PayloadAction<{success:boolean}>) => {
  state.success = action.payload.success;
} 

const setName = (state: EmployeeFormState, action: PayloadAction<{name:string}>) => {
  state.name = action.payload.name;
} 

const setDepartment = (state: EmployeeFormState, action: PayloadAction<{dept:Department}>) => {
  state.department = action.payload.dept;
} 

const setSalary = (state: EmployeeFormState, action: PayloadAction<{salary:number}>) => {
  state.salary = action.payload.salary;
} 

const setNameError = (state: EmployeeFormState, action: PayloadAction<{nameError:string}>) => {
  state.nameError = action.payload.nameError;
} 

const setDepartmentErrror = (state: EmployeeFormState, action: PayloadAction<{deptError:string}>) => {
  state.departmentError = action.payload.deptError;
} 

const setSalaryError = (state: EmployeeFormState, action: PayloadAction<{salaryError:string}>) => {
  state.salaryError = action.payload.salaryError;
} 

export const employeeFormSlice = createSlice({
  name: 'employee-form', 
  initialState,
  reducers: { 
    setEmployeeData,
    setSuccess,
    setName,
    setDepartment,
    setSalary,
    setNameError,
    setDepartmentErrror,
    setSalaryError
  }, 
})

export const employeeFormActions = employeeFormSlice.actions;
export default employeeFormSlice.reducer;
export const EmployeeFormState = (state: RootState) => state.employeeform;
