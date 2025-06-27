import { createSlice } from "@reduxjs/toolkit";
import { setOrderData, setSaveCart, setSaveItems } from "./itemSlice";

const initialState = {
  user: null,
  openSearch: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setOpenSearch: (state, action) => {
      state.openSearch = action.payload;
    },
  },
});

export const resetApp = () => (dispatch) => {
  dispatch(setUser(null));
  dispatch(setSaveItems([]));
  dispatch(setOrderData([]));
  dispatch(setSaveCart([]));
};

export const {
  setUser,
  setOpenSearch,
} = userSlice.actions;
export default userSlice.reducer;
