import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface DeleteDialogState {
    open: boolean;
}

const initialState: DeleteDialogState = {
    open: false,
}

const setOpen = (state: DeleteDialogState, action: PayloadAction<{open:boolean}>) => {
    state.open = action.payload.open;
} 

export const deleteDialogSlice = createSlice({
  name: 'delete-dialog', 
  initialState,
  reducers: { 
    setOpen
  }, 
})

export const deleteDialogActions = deleteDialogSlice.actions;
export default deleteDialogSlice.reducer;
export const NoitifcationDialogState = (state: RootState) => state.deletedialog;
