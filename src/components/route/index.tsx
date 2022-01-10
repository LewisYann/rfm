import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AuthRoute = (props) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.account) {
    return <Route {...props} />;
  } else if (!auth.account) {
    return <Redirect to={"/login"} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default AuthRoute;
