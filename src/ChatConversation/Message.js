import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="collection-item">
        <span className="title">{this.props.user}</span>
        <p>{this.props.text}</p>
      </li>
    );
  }
}

export default Message;
