import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import shoppingCartReducer from "./shoppingCartSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
  },
});

store.subscribe(() => {
  const emailAddress = store.getState().user.emailAddress;
  if (emailAddress) {
    window.localStorage.setItem("demo_app_persisted_state_email", emailAddress);
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
