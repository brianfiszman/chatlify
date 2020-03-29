import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import socketClient from "socket.io-client";

const ChatConversation = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      const { SOCKET_HOST } = process.env;
      const io = socketClient(SOCKET_HOST);
      const url = "/api/chat";

      function keepScrollDown() {
        const objDiv = document.querySelector(".conversation");
        objDiv.scrollTop = objDiv.scrollHeight;
      }

      try {
        const { data: messages } = await axios.get(url);

        setMessages(() => messages);
        keepScrollDown();
      } catch (error) {
        console.error(error);
        setTimeout(getMessages, 500);
      }

      io.on("new message", message => {
        setMessages(messages => [...messages, message]);
        keepScrollDown();
      });
    }

    getMessages();
  }, []);

  return (
    <article className="row conversation-container">
      <section className="col-12 conversation px-0">
        {messages.map(({ _id, user, text, timestamps = "" }) => (
          <Message key={_id} {...{ user, text, timestamps }} />
        ))}
      </section>
    </article>
  );
};

export default ChatConversation;
