import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice'
import modalReducer from "./slices/ModalSlice";
import bookReducer from "./slices/BookSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal:modalReducer,
        book:bookReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;