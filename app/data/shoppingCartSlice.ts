import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ShoppingCartItem {
  sku: string;
  quantity: number;
}
interface ShoppingCart {
  items: ShoppingCartItem[];
}

// Define the initial state using that type
const initialState: ShoppingCart = {
  items: [
    {
      sku: "1blwyeo8",
      quantity: 2,
    },
    {
      sku: "i5b1g92y",
      quantity: 1,
    },
  ],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateCart: (state, action: PayloadAction<ShoppingCartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { updateCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
