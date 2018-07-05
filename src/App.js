import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import ChatApp from "./ChatApp";
import Login from "./Login/Login";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chatapp/:user" component={ChatApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
