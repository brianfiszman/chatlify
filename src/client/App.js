import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import ChatApp from "./ChatApp";
import LoginContainer from "./Login/LoginContainer";
import socketClient from "socket.io-client";

const { SOCKETHOST } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = socketClient(SOCKETHOST);
    console.log(socketClient);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/chatapp/:user" component={ChatApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
