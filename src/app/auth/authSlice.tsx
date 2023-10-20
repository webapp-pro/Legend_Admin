import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";
const api = axios.create({
  baseURL: "http://116.202.172.229:8443/api/v1/",
});

export const storage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {}
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  },
};
export const setAccessTokenAsync = createAsyncThunk(
  "tokenlist/setAccessToken",
  async (tokenKey: string) => {
    return tokenKey;
  }
);


export const login = async (walletAddress : string, dispatch : any, callback: any)=>{
    try {
        let res = await api.post('user/login/',{walletAddress})
        if(res.data.accessToken){

            dispatch(setAccessTokenAsync(res.data.accessToken))
            dispatch(setLoginStateAsync(true))
            callback()
        }
        
    } catch (error) {
        alert('The Login Credintial is not exact')
    }
}


export const setLoginStateAsync = createAsyncThunk(
  "admin/setLoginStateAsync",
  async (state:boolean) => {
    return state
  }
);
const initialState = {
  loginState: false,
  accessToken: storage.get("aToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoginStateAsync.fulfilled, (state, action: any) => {
        if (action.payload !== "") {
            state.loginState = action.payload
        }
      })
      .addCase(setAccessTokenAsync.fulfilled, (state, action: any) => {
        if (action.payload !== "") {
          state.accessToken = action.payload;
          localStorage.setItem("aToken", action.payload);
        }
      })
      
  },
});
export const selectLoginState = (state:any) => state.auth.loginState;
export const selectAccessToken = (state:any) => state.auth.accessToken;
export const selectRefreshToken = (state:any) => state.auth.refreshToken;

export default authSlice.reducer;
