import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum Department { HR='HR', PS='PS' };

export interface EmployeeI {
    id: number;
    name: string;
    salary: number;
    department: Department;
}

interface EmployeeState {
    employees: Array<EmployeeI>;
}

const initialState: EmployeeState = {
    employees: []
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<{name:string; salary: number; department: Department}>) => {
            state.employees.push({
                id: state.employees.length,
                name: action.payload.name,
                salary: action.payload.salary,
                department: action.payload.department
            })
        }
    }
})


export default employeeSlice.reducer;
export const { addEmployee } = employeeSlice.actions;