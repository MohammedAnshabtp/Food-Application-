import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./fooddata";
export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export const RootState = () => store.getState();
export const AppDispatch = () => store.dispatch();
