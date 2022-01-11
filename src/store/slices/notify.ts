import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

type State = {
  message: string;
};

const initialState: State = {message: ""};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    notifySuccess(state: State, action: PayloadAction<{message: string}>) {
      toast.success(action.payload.message);
    },
    notifyError(state: State, action: PayloadAction<{message: string}>) {
      toast.error(action.payload.message);
    },
    notifyWarn(state: State, action: PayloadAction<{message: string}>) {
      toast.warn(action.payload.message);
    },
  },
});

export default notifySlice;
