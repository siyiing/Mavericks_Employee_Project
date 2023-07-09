// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./features/employeeSlice";


// used to create store to export it 
export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer
  }
})

// retrieve data from store 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // execute the reducer 

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;