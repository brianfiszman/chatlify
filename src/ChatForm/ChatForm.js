import React, { Component } from "react";
import axios from "axios";
import InputSubmit from "./InputSubmit";
import InputText from "./InputText";

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    if (this.state.text === "" || this.props.user === "") {
      alert("El campo de mensaje o usuario están vacíos.");
    } else {
      const querystring = require("querystring");
      axios.post(
        "/api/chat",
        querystring.stringify({
          user: this.props.user,
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

  render() {
    return (
      <article className="row">
        <form
          className="col-12 input-group"
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
