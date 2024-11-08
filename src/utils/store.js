import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/UserSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
