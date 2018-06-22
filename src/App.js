import React, { Component } from "react";
import ChatForm from "./ChatForm/ChatForm";
import InputUser from "./ChatForm/InputUser";
import ChatConversation from "./ChatConversation/ChatConversation";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      messageSent: false
    };

    this.onTextChange = this.onTextChange.bind(this);
  }

  handleSubmit() {
    this.setState({
      messageSent: true
    });
  }

  onTextChange(event) {
    this.setState({
      user: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <InputUser onChange={this.onTextChange} />
        <ChatConversation />
        <ChatForm
          user={this.state.user}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default App;
