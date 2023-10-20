import { configureStore } from "@reduxjs/toolkit";
import history from './history/historySlice'
import auth from './auth/authSlice'
import {useDispatch} from "react-redux"
export const store = configureStore({
    reducer: {
        history: history,
        auth: auth
    },
});
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;