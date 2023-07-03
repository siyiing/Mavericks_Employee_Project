import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./features/employeeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// used to create store to export it 
export const store = configureStore({
    reducer: {
        employee: employeeSlice.reducer
    }
})

// retrieve data from store 
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch; // execute the reducer 
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector; // get the state

