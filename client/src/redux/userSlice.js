import { createSlice } from "@reduxjs/toolkit";
import { setOrderData, setSaveCart, setSaveItems } from "./itemSlice";

const initialState = {
  user: null,
  isAuth: false,
  openSearch: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setOpenSearch: (state, action) => {
      state.openSearch = action.payload;
    },
  },
});

// ✅ Reset app thunk action (after the slice)
export const resetApp = () => (dispatch) => {
  dispatch(setUser(null));
  dispatch(setIsAuth(false));
  dispatch(setSaveItems([]));
  dispatch(setOrderData([]));
  dispatch(setSaveCart([]));
};

export const { setUser, setIsAuth, setOpenSearch } = userSlice.actions;
export default userSlice.reducer;
