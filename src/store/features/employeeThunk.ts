import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { Department } from "./employeeSlice";

const url = "http://localhost:5000/employee";

// export const fetchAllEmployeesThunk = createAsyncThunk( 
//     "employee/fetchAllEmployees", async() => {
//     try {
//        const response = await axios.get<any>(url, {withCredentials: true}); 
//        return response.data;
//     } catch (e: any) {
//         return e.response.data;
//     }
// })

export const fetchEmployeesByDeptIdThunk = createAsyncThunk( 
    "employee/fetchEmployeesByDeptId", async(departmentId: number) => {
    try {
       const response = await axios.get<any>(url + "s/" + departmentId, {withCredentials: true} );
       return response.data;
    } catch (e: any) {
        return e.response.data;
    }
})


export const createEmployeeThunk = createAsyncThunk(
    "employee/createEmployee", async(employee: {name:string, department: Department, salary:number}) => {
        try {
            const response = await axios.post(url, employee, {withCredentials: true});
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }
    }
)

export const updateEmployeeThunk = createAsyncThunk(
    "employee/updateEmployee", async(employee: {id?: number, name: string, department: Department, salary: number}) => {
        try { 
            const emp = { name:employee.name, department: employee.department, salary: employee.salary}
            const response = await axios.put(url + "/" + employee.id, emp, {withCredentials: true});
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }
    }
)

export const deleteEmployeeThunk = createAsyncThunk(
    "employee/deleteEmployee", async(id: number) => {
        try { 
            const response = await axios.delete(url + "/" + id, {withCredentials: true});
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }
    }
)