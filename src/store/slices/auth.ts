import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: null|{};
};

const initialState: State = {token: null, refreshToken: null, account: null};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{token: string; refreshToken: string}>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
     },
    setAccount(state: State, action: PayloadAction<{}>) {
      state.account = action.payload;
    },
    setLogout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
      localStorage.removeItem("user")
    },
  },
});

export default authSlice;

export const logout = () => async (dispatch:any) => {
  try {
    return dispatch(authSlice.actions.setLogout());
  } catch (e:any) {
    return console.error(e.message);
  }
};
