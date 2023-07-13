import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface PaginationState {
    curPage: number;
    totalItemCount: number;
    itemPerPage: number;
}

const initialState: PaginationState = {
  curPage: 1,
  totalItemCount: 0,
  itemPerPage: 10
}




export const paginationSlice = createSlice({
  name: 'pagination', 
  initialState,
  reducers: { 

  }, 
})

export default paginationSlice.reducer;
export const paginationState = (state: RootState) => state.pagination;
// export const { actions } = employeeSlice;