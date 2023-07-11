import { createSlice } from "@reduxjs/toolkit"
import { createEmployeeThunk, deleteEmployeeThunk, fetchAllEmployeesThunk, updateEmployeeThunk } from "./employeeThunk";
import { RootState } from "../store";

export enum Department { HR='HR', PS='PS'};

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
  isLoading: false,
}

export const employeeSlice = createSlice({
  name: 'employee', 
  initialState,
  reducers: { 
    // if want trigger page change for pagination, can write a function e,g,
    // if want to change internal state of the redux, need come to slice 
    // changePage(state, action: PayloadAction<boolean>) {
    //   state.isLoading = action.payload;
    // }
  }, 
  extraReducers:(builders) => {
    builders // 3 basic states = pending, fulfilled and rejected 
    .addCase(fetchAllEmployeesThunk.pending, (state) => { // when making api request, waiting for response to come 
      state.isLoading = true;
    })
    .addCase(fetchAllEmployeesThunk.fulfilled, (state, action) => { // successfully obtained a response 
      state.employees = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchAllEmployeesThunk.rejected, (state) => { // failed to receive a response 
      state.employees = initialState.employees; // reset state to empty list 
      state.isLoading = false;
    })
    .addCase(createEmployeeThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(createEmployeeThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(createEmployeeThunk.rejected, (state) => { 
      state.employees = initialState.employees; 
      state.isLoading = false;
    })
    .addCase(updateEmployeeThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(updateEmployeeThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(updateEmployeeThunk.rejected, (state) => { 
      state.employees = initialState.employees; 
      state.isLoading = false;
    })
    .addCase(deleteEmployeeThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(deleteEmployeeThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(deleteEmployeeThunk.rejected, (state) => { 
      state.employees = initialState.employees; 
      state.isLoading = false;
    })
  }
})

export default employeeSlice.reducer;
export const employeeState = (state: RootState) => state.employee;
// export const { actions } = employeeSlice;