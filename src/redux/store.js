import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import resourceReducer from "./slices/resource";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  resource: resourceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export const persistor = persistStore(store);

export default store;
