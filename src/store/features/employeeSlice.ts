import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createEmployeeThunk, deleteEmployeeThunk, updateEmployeeThunk, fetchEmployeesByDeptIdThunk } from "./employeeThunk"; // fetchAllEmployeesThunk
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
  totalCount: number;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false,
  totalCount: 0
}

// const setEmpData = (state: EmployeeState, action: PayloadAction<{totalCount: number}>) => {
//   state.totalCount = action.payload.totalCount;
// } 

const setTotalCount = (state: EmployeeState, action: PayloadAction<{totalCount: number}>) => {
  state.totalCount = action.payload.totalCount;
} 

export const employeeSlice = createSlice({
  name: 'employee', 
  initialState,
  reducers: { 
    setTotalCount,
  }, 
  extraReducers:(builders) => {
    builders 
    // .addCase(fetchAllEmployeesThunk.pending, (state) => { 
    //   state.isLoading = true;
    // })
    // .addCase(fetchAllEmployeesThunk.fulfilled, (state, action) => {
    //   state.employees = action.payload;
    //   state.isLoading = false;
    // })
    // .addCase(fetchAllEmployeesThunk.rejected, (state) => { 
    //   state.employees = initialState.employees; 
    //   state.isLoading = false;
    // })
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
    .addCase(fetchEmployeesByDeptIdThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(fetchEmployeesByDeptIdThunk.fulfilled, (state, action) => { 
      state.employees = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchEmployeesByDeptIdThunk.rejected, (state) => { 
      state.employees = initialState.employees;
      state.isLoading = false;
    })
  }
})

export const employeeAction = employeeSlice.actions;
export default employeeSlice.reducer;
export const employeeState = (state: RootState) => state.employee;