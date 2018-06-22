import React, { Component } from "react";
import ChatApp from "./ChatApp";
import InputUser from "./Login/InputUser";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={InputUser} />
          <Route path="/chatapp/:user" component={ChatApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
