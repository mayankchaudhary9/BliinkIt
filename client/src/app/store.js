import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartProduct";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
  },
});
