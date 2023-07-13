import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./features/employeeSlice";
import { paginationSlice } from "./features/paginationSlice";
import { employeeFormSlice } from "./features/employeeFormSlice";
import { notificationDialogSlice } from "./features/notificationDialogSlice";
import { deleteDialogSlice } from "./features/deleteDialogSlice";

// used to create store to export it 
export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
    employeeform: employeeFormSlice.reducer,
    pagination: paginationSlice.reducer,
    notificationdialog: notificationDialogSlice.reducer, 
    deletedialog: deleteDialogSlice.reducer
  }
})

// retrieve data from store 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // execute the reducer 
