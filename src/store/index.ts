import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  notify: notifySlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;

export default store;