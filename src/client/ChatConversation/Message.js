import React from "react";

const Message = ({ user, timestamps, text }) => (
  <article className="col-12 message-item py-0 mw-100">
    <section className="title font-weight-bold">
      {user + " "}
      {timestamps && (
        <span className="font-weight-normal text-muted small">
          {new Date(timestamps).toLocaleString()}
        </span>
      )}
    </section>
    <section>{text}</section>
  </article>
);

export default Message;
