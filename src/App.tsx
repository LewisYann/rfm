import React from "react";
import store, {persistor} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthRoute from "./routes";
import {Provider} from "react-redux";
import Admin from "./layouts/Admin.js";
import Login from "./views/login/login.js"
import Register from "./views/login/register.js"
import "./assets/css/material-dashboard-react.css?v=1.10.0";


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <AuthRoute exact path="/" component={() => <Redirect to={"/acceuil"} />} />
            <AuthRoute path="/acceuil/" component={Home} />
            <AuthRoute exact path="/riders/" component={RiderList} />         
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
