// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import itemReducer from "./itemSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage by default

const rootReducer = combineReducers({
  user: userReducer,
  items: itemReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // 🔐 only persist user, not items (you can add items too)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup with middleware fixes for redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
