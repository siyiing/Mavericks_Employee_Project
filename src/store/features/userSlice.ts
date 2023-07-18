import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { createUserThunk, fetchUserByUsernameThunk } from "./userThunk";

export interface UserI {
    username: string;
    password: string;
    departmentId: number;
  }

interface UserState {
    user: UserI,
    isLoading: boolean;
    signup_success: boolean;
    login_success: boolean;
}

const initialState: UserState = {
    user: { username: "", password: "", departmentId: 1},
    isLoading: false,
    signup_success: false,
    login_success: false
}

const setUserData = (state: UserState, action: PayloadAction<{userData: UserI}>) => {
  state.user = action.payload.userData;
} 

const setSignUpSuccess = (state: UserState, action: PayloadAction<{success:boolean}>) => {
  state.signup_success = action.payload.success;
} 

const setLoginSuccess = (state: UserState, action: PayloadAction<{success:boolean}>) => {
  state.login_success = action.payload.success;
} 

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: { 
    setUserData, 
    setSignUpSuccess,
    setLoginSuccess
  },
  extraReducers:(builders) => {
    builders 
    .addCase(fetchUserByUsernameThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(fetchUserByUsernameThunk.fulfilled, (state, action) => { 
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchUserByUsernameThunk.rejected, (state) => { 
      state.user = initialState.user; 
      state.isLoading = false;
    })
    .addCase(createUserThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(createUserThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(createUserThunk.rejected, (state) => { 
      state.user = initialState.user; 
      state.isLoading = false;
    })
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const UserState = (state: RootState) => state.user;
