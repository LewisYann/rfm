import authSlice from "../../store/slices/auth";


export const logout = () => async (dispatch) => {
  try {
    return dispatch(authSlice.actions.setLogout());
  } catch (e) {
    return console.error(e.message);
  }
};
