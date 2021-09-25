import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Provider from "./components/provider/Provider";
import AuthRoute from "./utils/authRoute";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path="/">
            <Dashboard />
          </AuthRoute>
          <Route exact path="/auth">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
