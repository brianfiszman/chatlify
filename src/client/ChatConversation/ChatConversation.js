import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import socketClient from "socket.io-client";

class ChatConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const { SOCKETHOST } = process.env;
    const io = socketClient(SOCKETHOST);

    io.on("new message", message => {
      this.setState(({ messages }) => ({
        messages: [...messages, message]
      }));

      this.keepScrollDown();
    });

    const getMessages = () => {
      let lastElement = this.getLastMessageId();
      let url = lastElement ? "/api/chat?id=" + lastElement : "/api/chat";
      axios
        .get(url, { timeout: 1000 * 100 })
        .then(res => {
          this.setState({ messages: res.data });
          this.keepScrollDown();
        })
        .catch(function(error) {
          console.error(error);
          setTimeout(getMessages, 500);
        });
    };

    getMessages();
  }

  getLastMessageId() {
    let length = this.state.messages ? this.state.messages.length : 0;
    return length > 0 ? this.state.messages[length - 1]._id : undefined;
  }

  keepScrollDown() {
    var objDiv = document.querySelector(".conversation");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <article className="row conversation-container">
        <section className="col-12 conversation px-0">
          {this.state.messages
            ? this.state.messages.map(message => (
                <Message
                  key={message.id}
                  user={message.user}
                  text={message.text}
                  timestamps={message.timestamps ? message.timestamps : ""}
                />
              ))
            : ""}
        </section>
      </article>
    );
  }
}
export default ChatConversation;
