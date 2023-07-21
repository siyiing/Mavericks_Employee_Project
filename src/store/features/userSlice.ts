import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { createUserThunk, loginUserThunk, logoutThunk, getAuthThunk } from "./userThunk";
import Cookies from "js-cookie";

export interface UserI {
    username: string;
    password: string;
    departmentId: number;
  }

interface UserState {
    loggedUser: UserI;
    isLoading: boolean;
    signup_success: boolean;
    login_success: boolean;
    authToken: string;
    cookie: string;
}

const initialState: UserState = {
    loggedUser: { username: "", password: "", departmentId: 1},
    isLoading: false,
    signup_success: false,
    login_success: false,
    authToken: "",
    cookie: Cookies.get("token") || ""
}

const setLoggedUser = (state: UserState, action: PayloadAction<{user: UserI}>) => {
  state.loggedUser = action.payload.user;
} 

const setSignUpSuccess = (state: UserState, action: PayloadAction<{success:boolean}>) => {
  state.signup_success = action.payload.success;
} 

const setLoginSuccess = (state: UserState, action: PayloadAction<{success:boolean}>) => {
  state.login_success = action.payload.success;
} 

const setAuthToken = (state: UserState, action: PayloadAction<{token:string}>) => {
  state.authToken = action.payload.token;
} 

const setCookie = (state: UserState, action: PayloadAction<{cookie:string}>) => {
  state.cookie = action.payload.cookie;
} 

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: { 
    setLoggedUser, 
    setSignUpSuccess,
    setLoginSuccess,
    setAuthToken,
    setCookie
  },
  extraReducers:(builders) => {
    builders 
    .addCase(createUserThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(createUserThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(createUserThunk.rejected, (state) => { 
      state.loggedUser = initialState.loggedUser; 
      state.isLoading = false;
    })
    .addCase(loginUserThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(loginUserThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(loginUserThunk.rejected, (state) => { 
      state.loggedUser = initialState.loggedUser; 
      state.isLoading = false;
    })
    .addCase(logoutThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(logoutThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(logoutThunk.rejected, (state) => { 
      state.loggedUser = initialState.loggedUser; 
      state.isLoading = false;
    })
    .addCase(getAuthThunk.pending, (state) => { 
      state.isLoading = true;
    })
    .addCase(getAuthThunk.fulfilled, (state) => { 
      state.isLoading = false;
    })
    .addCase(getAuthThunk.rejected, (state) => { 
      state.isLoading = false;
    })
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const UserState = (state: RootState) => state.user;
