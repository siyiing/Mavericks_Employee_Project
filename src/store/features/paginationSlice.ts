import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface PaginationState {
    curPage: number;
    itemPerPage: number;
    preDisabled: boolean;
    nextDisabled: boolean;
}

const initialState: PaginationState = {
  curPage: 1,
  itemPerPage: 10,
  preDisabled: true,
  nextDisabled: true
}

const setCurPage = (state: PaginationState, action: PayloadAction<{curPage:number}>) => {
    state.curPage = action.payload.curPage;
} 

const setItemPerPage = (state: PaginationState, action: PayloadAction<{itemPerPage:number}>) => {
    state.itemPerPage = action.payload.itemPerPage;
} 

const setPreDisabled = (state: PaginationState, action: PayloadAction<{preDisabled:boolean}>) => {
  state.preDisabled = action.payload.preDisabled;
} 

const setNextDisabled = (state: PaginationState, action: PayloadAction<{nextDisabled:boolean}>) => {
  state.nextDisabled = action.payload.nextDisabled;
} 

export const paginationSlice = createSlice({
  name: 'pagination', 
  initialState,
  reducers: { 
    setCurPage,
    setItemPerPage,
    setPreDisabled,
    setNextDisabled
  }, 
})

export const paginationAction = paginationSlice.actions;
export default paginationSlice.reducer;
export const paginationState = (state: RootState) => state.pagination;
