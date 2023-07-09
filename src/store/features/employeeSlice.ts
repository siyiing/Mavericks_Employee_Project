// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { createEmployeeThunk, fetchAllEmployeesThunk } from "./employeeThunk";
import { RootState } from "../store";

export enum Department { HR='HR', PS='PS', ADMIN='ADMIN'};

export interface EmployeeI {
  id?: number;
  name: string;
  department: Department;
  salary: number;
}

interface EmployeeState {
  employees: Array<EmployeeI>;
  isLoading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false
}

export const employeeSlice = createSlice({
  name: 'employee', 
  initialState,
  reducers: {}, 
  extraReducers:(builders) => {
    builders // 3 basic states = pending, fulfilled and rejected 
    .addCase(fetchAllEmployeesThunk.pending, (state, action) => { // when making api request, waiting for response to come 
      state.isLoading = true;
    })
    .addCase(fetchAllEmployeesThunk.fulfilled, (state, action) => { // successfully obtained a response 
      state.employees = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchAllEmployeesThunk.rejected, (state, action) => { // failed to receive a response 
      state.employees = initialState.employees; // reset state to empty list 
      state.isLoading = false;
    })
    .addCase(createEmployeeThunk.pending, (state, action) => { 
      state.isLoading = true;
    })
    .addCase(createEmployeeThunk.fulfilled, (state, action) => { 
      // state.employees = action.payload;
      state.isLoading = false;
    })
    .addCase(createEmployeeThunk.rejected, (state, action) => { 
      state.employees = initialState.employees; 
      state.isLoading = false;
    })
  }
})

export default employeeSlice.reducer;
export const employeeState = (state: RootState) => state.employee;
// export const { addEmployee } = employeeSlice.actions;