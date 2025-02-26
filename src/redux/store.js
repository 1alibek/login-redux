import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Noto'g'ri yo'lni tuzatildi

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
