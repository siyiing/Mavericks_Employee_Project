import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { Department } from "./employeeSlice";

const url = "http://localhost:5000/employee";

export const fetchAllEmployeesThunk = createAsyncThunk( 
    "employee/fetchAllEmployees", async() => {
    try {
       const response = await axios.get<any>(url); 
       console.log(response);
       return response.data;
    } catch (e: any) {
        console.log(e);
        return e.response.data;
    }
})

export const createEmployeeThunk = createAsyncThunk(
    "employee/createEmployee", async(employee: {name:string, department: Department, salary:number}) => {
        try {
            const response = await axios.post(url, employee);
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }
    }
)