import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-group-item message-item py-0">
        <div className="title font-weight-bold text-nowrap text-nowrap">
          {this.props.user}
        </div>
        <div>{this.props.text}</div>
      </li>
    );
  }
}

export default Message;
