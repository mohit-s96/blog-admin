import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Provider from "./components/provider/Provider";
import AuthRoute from "./utils/authRoute";
import Test from "./pages/test";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path="/">
            <Dashboard />
          </AuthRoute>
          <AuthRoute exact path="/create">
            <Dashboard />
          </AuthRoute>
          <Route exact path="/auth">
            <Login />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
