/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Perso from "layouts/Perso.js";
import Login from "views/login/login.js"
import Register from "views/login/register.js"
import PrivateRoute from './components/privateRoutes'
import "assets/css/material-dashboard-react.css?v=1.10.0";

const history=createBrowserHistory()

ReactDOM.render(
  <Router history={history} >
    <Switch >
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
     </Switch>
  </Router>,
  document.getElementById("root")
);

