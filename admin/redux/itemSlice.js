import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orders:[]
};
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setOrders: (state, action)=>{
      state.orders = action.payload
    }
  },
});

export const { setItems,setOrders } = itemSlice.actions;
export default itemSlice.reducer;
