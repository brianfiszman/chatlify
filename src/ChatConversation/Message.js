import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="col-12 message-item py-0 mw-100">
        <section className="title font-weight-bold">{this.props.user}</section>
        <section>{this.props.text}</section>
      </article>
    );
  }
}

export default Message;
