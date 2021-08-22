/** @format */

import React, { useEffect, useState } from "react";
import { Moralis } from "moralis";

import NewMessage from "./newMessage";

const ChatMessages = ({ groupId }) => {
  const [messages, setMessages] = useState(null);
  const [createMessage, setCreateMessage] = useState(0);

  const queryMessages = async () => {
    const Messages = Moralis.Object.extend("ChatMessages");
    const query = new Moralis.Query(Messages);
    query.equalTo("chatId", groupId);
    const result = await query
      .find()
      .then(result => JSON.stringify(result, null, 2))
      .then(result => JSON.parse(result));

    setMessages(result);

    console.log("RESULT", result);
  };

  useEffect(() => {
    queryMessages();
  }, [groupId, createMessage]);

  if (!messages) {
    return <></>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // border: "1px solid red",
        width: "55%",
      }}
    >
      <div
        style={{
          overflowY: "scroll",
          //   border: "1px solid blue",
          height: "90%",
          maxHeight: "90%",
        }}
      >
        {messages.map(message => {
          return (
            <div
              key={message.objectId}
              style={{
                padding: "5px 5px",
                marginBottom: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      <NewMessage chatId={groupId} setNewMsg={setCreateMessage} />
    </div>
  );
};

export default ChatMessages;
