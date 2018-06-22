import React, { Component } from "react";
import ChatConversation from "./ChatConversation/ChatConversation";
import ChatForm from "./ChatForm/ChatForm";

class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        <ChatConversation />
        <ChatForm
          user={this.props.match.params.user}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default ChatApp;
