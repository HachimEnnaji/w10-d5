import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CardsReducer from "../reducers";
import thunk from "redux-thunk";

import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const combine = combineReducers({
  songsData: CardsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combine);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
