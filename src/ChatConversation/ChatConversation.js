import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";

class ChatConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  getLastMessageId() {
    let length = this.state.messages ? this.state.messages.length : 0;
    return length > 0 ? this.state.messages[length - 1]._id : undefined;
  }

  keepScrollDown() {
    var objDiv = document.querySelector(".conversation");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  componentDidMount() {
    const getMessages = () => {
      let lastElement = this.getLastMessageId();
      let url = lastElement ? "/chats?id=" + lastElement : "/chats";
      axios
        .get(url, { timeout: 25000 })
        .then(res => {
          this.setState({ messages: res.data });
          this.keepScrollDown();
          setTimeout(getMessages, 500);
        })
        .catch(function(error) {
          setTimeout(getMessages, 500);
        });
    };

    getMessages();
  }

  render() {
    return (
      <div className="row conversation">
        <ul className="col s12 collection">
          {this.state.messages.map(message => (
            <Message key={message.id} user={message.user} text={message.text} />
          ))}
        </ul>
      </div>
    );
  }
}
export default ChatConversation;
