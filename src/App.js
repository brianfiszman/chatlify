import React, { Component } from "react";
import ChatForm from "./ChatForm/ChatForm";
import ChatConversation from "./ChatConversation/ChatConversation";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageSent: false
    };
  }

  handleSubmit() {
    this.setState({
      messageSent: true
    });
  }

  render() {
    return (
      <main className="container">
        <ChatConversation />
        <ChatForm onSubmit={this.handleSubmit.bind(this)} />
      </main>
    );
  }
}

export default App;
