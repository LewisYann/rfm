import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
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
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/auth";
import notifySlice from "./slices/notify";
import storage from "redux-persist/lib/storage";
import { missionApi, userApi, settingApi } from "../services/api";
import languageSlice from "./slices/language";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  notify: notifySlice.reducer,
  language:languageSlice.reducer,
  [missionApi.reducerPath]: missionApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
});
const persistConfig = {
  key: "roots",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
    missionApi.middleware,
    userApi.middleware,
    settingApi.middleware,
  ];
  return middlewareList;
};


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware),
});

export const persistor = persistStore(store);


export type persistState = ReturnType<typeof rootReducer>;

export default store