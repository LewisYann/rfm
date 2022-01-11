import React from "react";
import {  Route } from "react-router-dom";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AuthRoute = (props) => {
  const auth = useSelector((state) => state.auth);
console.log("test")
  if (auth.account) {
    return <Route {...props} />;
  } else if (!auth.account) {
    return <Navigate to={"/login"} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default AuthRoute;
