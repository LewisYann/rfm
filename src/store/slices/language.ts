import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
  language: string | null;
  
};

const initialState: State = {language:"en"};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(
      state: State,
      action: PayloadAction<{language: string}>
    ) {
      state.language = action.payload.language;
     },

    setLogout(state: State) {
      state.language ="en";
    },
  },
});

export default languageSlice;

export const logout = () => async (dispatch:any) => {
  try {
    return dispatch(languageSlice.actions.setLogout());
  } catch (e:any) {
    return console.error(e.message);
  }
};
