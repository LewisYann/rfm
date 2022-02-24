import React from "react";
 import "./App.css";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import AuthRoute from "./components/route";
import Home from "./pages/Dashboard/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import Setting from "./pages/UserProfile/Setting";
import Control from "./pages/TableList/Control";
import NewMission from "./pages/UserProfile/NewMission";
import Missions from "./pages/TableList/Missions";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home/*"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route path="/dashboard/*" element={<Home />} />
            <Route
              path="/control"
              element={
                <AuthRoute>
                  <Control />
                </AuthRoute>
              }
            />
            <Route
              path="/missions"
              element={
                <AuthRoute>
                  <Missions />
                </AuthRoute>
              }
            />
            <Route
              path="create/mission"
              element={
                <AuthRoute>
                  <NewMission />
                </AuthRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthRoute>
                  <Setting />
                </AuthRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <AuthRoute>
                  <UserProfile />
                </AuthRoute>
              }
            />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
