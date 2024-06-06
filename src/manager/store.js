import registerReducer from "./registrationSlice";
import AppReducer from "./appSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { general: AppReducer, apply: registerReducer },
  devTools: true,
});
