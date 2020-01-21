import React, { Component } from "react";
import InputSubmit from "./InputSubmit";
import InputText from "./InputText";
import axios from "axios";

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Math.random() * (10000000 - 1),
      text: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  handleSubmit(event) {
    if (this.state.text === "" || this.state.user === "") {
      alert("Escribir mensaje");
    } else {
      const querystring = require("querystring");
      axios.post(
        "/chats",
        querystring.stringify({
          user: this.state.user,
          text: this.state.text
        })
      );
      this.props.onSubmit();
      this.setState({
        text: ""
      });
    }

    event.preventDefault();
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <article className="row">
        <form
          className="col s12"
          action=""
          method="post"
          onSubmit={this.handleSubmit}
        >
          <InputText onTextChange={this.onTextChange} value={this.state.text} />
          <InputSubmit />
        </form>
      </article>
    );
  }
}

export default ChatForm;
