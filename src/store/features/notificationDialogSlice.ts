import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface NotificationDialogState {
    open: boolean;
    message: string;
    location: string;
}

const initialState: NotificationDialogState = {
   open: false,
   message: "",
   location: ""
}

const setOpen = (state: NotificationDialogState, action: PayloadAction<{open:boolean}>) => {
    state.open = action.payload.open;
} 

const setMessage = (state: NotificationDialogState, action: PayloadAction<{message:string}>) => {
    state.message = action.payload.message;
} 

const setLocation = (state: NotificationDialogState, action: PayloadAction<{location:string}>) => {
    state.location = action.payload.location;
} 

export const notificationDialogSlice = createSlice({
  name: 'notification-dialog', 
  initialState,
  reducers: { 
    setOpen,
    setMessage,
    setLocation
  }, 
})

export const notificationDialogActions = notificationDialogSlice.actions;
export default notificationDialogSlice.reducer;
export const NoitifcationDialogState = (state: RootState) => state.notificationdialog;
