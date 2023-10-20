import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";

const data: DataType[] = [
  // { id: 1, name: 'Snow', category: 'Jon', age: 35 },
  // { id: 2, name: 'Lannister', category: 'human', age: 42 },
  // { id: 3, name: 'Lannister', category: 'country', age: 45 },
  // { id: 4, name: 'Stark', category: 'human', age: 16 },
  // { id: 5, name: 'Targaryen', category: 'animal', age: null },
  // { id: 6, name: 'Melisandre', category: null, age: 150 },
  // { id: 7, name: 'Clifford', category: 'animal', age: 44 },
  // { id: 8, name: 'Frances', category: 'human', age: 36 },
  // { id: 9, name: 'Roxie', category: 'country', age: 65 },
];
export const getAllData = createAsyncThunk(
  "charecters/getAllData",
  async (token: string) => {
    if (token) {
      let res = await axios.post(
        "http://116.202.172.229:8443/api/v1/user/history/",
        { token }
      );
      return res.data.data;
    }
    return [];
  }
);
export const getDataByWallet = createAsyncThunk(
  "charecters/getDataByWallet",
  async ({ walletAddress, accessToken }: any) => {
    if (walletAddress.startsWith("0x")) {
      let res = await axios.post(
        "http://116.202.172.229:8443/api/v1/user/history-by-wallet/",
        { walletAddress, accessToken }
      );
      return res.data.data;
    }
    return []
  }
);
const initialState = {
  data: [] as DataType[],
  detail: [] as DataType[],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.data = data;
      })
      .addCase(getDataByWallet.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.detail = data;
      });
  },
});
export default characterSlice.reducer;
