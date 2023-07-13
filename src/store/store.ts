import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./features/employeeSlice";
import { paginationSlice } from "./features/paginationSlice";

// used to create store to export it 
export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
    pagination: paginationSlice.reducer,
  }
})

// retrieve data from store 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // execute the reducer 
