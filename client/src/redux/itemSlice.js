import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  saveItems: [],
  saveCart: [],
  orderData: [],
};
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSaveItems: (state, action) => {
      state.saveItems = action.payload;
    },
    setSaveCart: (state, action) => {
      state.saveCart = action.payload;
    },
    removeItemFromCart: (state, action) => {
      state.saveCart = state.saveCart.filter(
        (item) => item.itemId._id !== action.payload
      );
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

export const {
  setItems,
  setSaveItems,
  setSaveCart,
  removeItemFromCart,
  setOrderData,
} = itemSlice.actions;
export default itemSlice.reducer;
