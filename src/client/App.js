import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import ChatApp from "./ChatApp";
import LoginContainer from "./Login/LoginContainer";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginContainer} />
      <Route exact path="/chatapp/:user" component={ChatApp} />
    </Switch>
  </BrowserRouter>
);

export default App;
