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
import { Route, Switch, Redirect, Router } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import Login from "views/login/login.js"
import Register from "views/login/register.js"
import "assets/css/material-dashboard-react.css?v=1.10.0";
import history from "./variables/history"

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {
         localStorage.getItem('user')? <Route   path="/admin"  component={Admin} />:
         <Redirect to='/login' />
      }
     </Switch>
  </Router>,
  document.getElementById("root")
);

