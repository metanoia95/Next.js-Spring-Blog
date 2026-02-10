import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authslice";




// Redux Store 설정
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });
} 

// Redux 타입스크립트 설정
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']