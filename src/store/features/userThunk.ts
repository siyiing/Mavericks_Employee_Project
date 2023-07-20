import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const url = "http://localhost:5000/user";

// export const fetchAllUsersThunk = createAsyncThunk( 
//     "user/fetchAllUsers", async() => {
//     try {
//        const response = await axios.get<any>(url); 
//        return response.data;
//     } catch (e: any) {
//         return e.response.data;
//     }
// })

// CREATE USER 
export const createUserThunk = createAsyncThunk(
    "user/createUser", async(user: {username:string, password: string, departmentId:number}) => {
        try {
            const response = await axios.post(url, user);
            return response.data;
        } catch (e: any) {
            return e.response.data;
        }
    }
)

// GET USER BY USERNAME 
// export const fetchUserByUsernameThunk = createAsyncThunk( 
//     "user/fetchUserByUsername", async(username: string) => {
//     try {
//        const response = await axios.get<any>(url + "/" + username); 
//        return response.data;
//     } catch (e: any) {
//         return e.response.data;
//     }
// })

// FETCH USER BY LOGIN CREDENTIALS 
export const loginUserThunk = createAsyncThunk( 
    "user/loginUser", async(user: {username: string, password: string}) => {
    try {
    //    const response = await axios.get<any>(url + "/" + user.username); 
    const response = await axios.post(url + "login", user, {withCredentials: true}); 
       return response.data;
    } catch (e: any) {
        return e.response.data;
    }
})