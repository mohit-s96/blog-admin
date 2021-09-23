import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/auth">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
